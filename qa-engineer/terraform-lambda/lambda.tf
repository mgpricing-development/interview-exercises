resource "aws_iam_policy" "lambda_policy" {
  name        = "interview-exercise-lambdaPolicy"
  path        = "/"
  description = "IAM policy for Lambda Functions"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "ssm:GetParameter*"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "kms:Decrypt"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role" "iam_for_lambda" {
  name = "interview-exercise-lambdaRole"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": ["lambda.amazonaws.com", "edgelambda.amazonaws.com"]
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_role_attachment" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

resource "aws_cloudwatch_log_group" "lambda_log_groups" {
  name              = "/aws/lambda/interview-exercise-lambdaAtEdge"
  retention_in_days = 14
}

resource "aws_lambda_function" "lambda_functions" {
  depends_on    = [aws_cloudwatch_log_group.lambda_log_groups, aws_iam_role_policy_attachment.lambda_role_attachment]
  filename      = "lambda_payload/src.zip"
  function_name = "interview-exercise-lambdaAtEdge"
  role          = aws_iam_role.iam_for_lambda.arn
  runtime       = "nodejs16.x"
  timeout       = 5
  memory_size   = 128
  handler       = "handler.handler"
}
