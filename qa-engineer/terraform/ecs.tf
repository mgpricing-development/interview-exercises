resource "aws_cloudwatch_log_group" "cloudwatch_log_group" {
  name = "qa-example-log-group"
  retention_in_days = 30

  tags = local.common_tags
}

data "aws_iam_policy_document" "ecs-tasks-assume-role-policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_policy" "execution-policy" {
  name = "qa-example-ecs-execution-policy"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ecs:CreateCluster", "ecs:DeregisterContainerInstance", "ecs:DiscoverPollEndpoint",
        "ecs:Poll", "ecs:RegisterContainerInstance", "ecs:StartTelemetrySession",
        "ecs:UpdateContainerInstancesState", "ecs:Submit*", "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability", "ecr:GetDownloadUrlForLayer", "ecr:BatchGetImage",
        "logs:CreateLogStream", "logs:PutLogEvents",
        "ssm:GetParameters",
        "ssm:GetParametersByPath",
        "kms:Decrypt"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_role" "execution_role" {
  name = "qa-example-ecs-execution-role"
  assume_role_policy = data.aws_iam_policy_document.ecs-tasks-assume-role-policy.json
}

resource "aws_iam_role_policy_attachment" "execution_role_attachment" {
  role = aws_iam_role.execution_role.name
  policy_arn = aws_iam_policy.execution-policy.arn
}

resource "aws_iam_policy" "task_policy" {
  name = "qa-example-task-policy"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ssm:GetParameters",
        "ssm:GetParametersByPath",
        "kms:Decrypt"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_role" "task_role" {
  name = "qa-example-task-role"
  assume_role_policy = data.aws_iam_policy_document.ecs-tasks-assume-role-policy.json
}

resource "aws_iam_role_policy_attachment" "qa_example_task_role_attachment" {
  role = aws_iam_role.task_role.name
  policy_arn = aws_iam_policy.task_policy.arn
}

resource "aws_ecs_cluster" "ecs_cluster" {
  name = "qa-example"
  tags = local.common_tags
}

resource "aws_security_group" "load_balancer_security_group" {
  name = "qa-example-load-balancer-sg"
  description = "Security Group for QA Example Load Balancer"
  vpc_id = local.vpc_id

  ingress {
    description = "Allow HTTPS/443 from anywhere"
    from_port = 443
    to_port = 443
    cidr_blocks = ["0.0.0.0/0"]
    protocol = "tcp"
  }

  ingress {
    description = "Allow HTTP/80 from anywhere"
    from_port = 80
    to_port = 80
    cidr_blocks = ["0.0.0.0/0"]
    protocol = "tcp"
  }

  egress {
    protocol = "-1"
    from_port = 0
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags
}

resource "aws_security_group" "container_security_group" {
  name = "qa-example-container-sg"
  description = "Security Group for QA Example Container"
  vpc_id = local.vpc_id

  ingress {
    description = "Allow Port ${var.docker_port_number}  from the Load Balancer"
    from_port = var.docker_port_number
    to_port = var.docker_port_number
    protocol = "tcp"
    security_groups = [ aws_security_group.load_balancer_security_group.id ]
  }

  egress {
    protocol = "-1"
    from_port = 0
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags
}

resource "aws_lb" "load_balancer" {
  name = "qa-example-lb"
  internal = false
  load_balancer_type = "application"
  security_groups = [aws_security_group.load_balancer_security_group.id]
  subnets = local.public_subnet_ids
}

resource "aws_lb_listener" "load_balancer_http_listener" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port = 80
  protocol = "HTTP"
  default_action {
    type = "redirect"

    redirect {
      port = 443
      protocol = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_target_group" "target_group" {
  name = "qa-example-tg"
  vpc_id = local.vpc_id
  port = var.docker_port_number
  protocol = "HTTP"
  target_type = "ip"

  health_check {
    healthy_threshold = 2
    unhealthy_threshold = 2
    protocol = "HTTP"
    path = "/healthcheck/"
    interval = 10
    timeout = 5
    matcher = "200,301"
  }
}

resource "aws_lb_listener" "load_balancer_https_listener" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port = 443
  protocol = "HTTPS"
  certificate_arn = var.api_certificate_arn

  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.target_group.arn
  }
}

resource "aws_ecs_task_definition" "task_definition" {
  family = "qa-example"
  cpu = 2048
  memory = "4096"
  network_mode = "awsvpc"
  requires_compatibilities = [ "FARGATE" ]
  execution_role_arn = aws_iam_role.execution_role.arn
  container_definitions = <<TASK_DEFINITIONS
[
  {
    "name": "discover-api",
    "essential": true,
    "image": "nginx",
    "portMappings": [ { "ContainerPort": ${var.docker_port_number} } ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "${aws_cloudwatch_log_group.cloudwatch_log_group.name}",
        "awslogs-region": "${var.region}",
        "awslogs-stream-prefix": "qa-example"
      }
    }
  }
]
TASK_DEFINITIONS

  tags = local.common_tags
}

resource "aws_ecs_service" "ecs_service" {
  name = "qa-example"
  depends_on = [aws_lb.load_balancer, aws_lb_listener.load_balancer_https_listener]
  cluster = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.task_definition.arn
  launch_type = "FARGATE"
  scheduling_strategy = "REPLICA"
  desired_count = var.desired_count
  deployment_maximum_percent = 200
  deployment_minimum_healthy_percent = 100
  health_check_grace_period_seconds = 60

  load_balancer {
    container_name = "qa-example"
    container_port = var.docker_port_number
    target_group_arn = aws_lb_target_group.target_group.arn
  }

  network_configuration {
    subnets = local.private_subnet_ids
    security_groups = [aws_security_group.container_security_group.id]
  }

  lifecycle {
    ignore_changes = [task_definition]
  }

  tags = local.common_tags
}

resource "aws_route53_record" "route_53" {
  zone_id = var.host_zone_id
  name = local.api_host_name
  type = "CNAME"
  records = [ aws_lb.load_balancer.dns_name]
  ttl = 900
}
