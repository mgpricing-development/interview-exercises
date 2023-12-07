data "tfe_outputs" "vpc" {
  organization = var.environment_name == "live" ? "Cuvama-LIVE" : "Cuvama-DEV"
  workspace    = "vpc-${var.environment_name}"
}

locals {
  vpc_id                 = nonsensitive(data.tfe_outputs.vpc.values.vpc_id)
  public_subnet_ids      = nonsensitive(data.tfe_outputs.vpc.values.public_subnet_ids)
  private_subnet_ids     = nonsensitive(data.tfe_outputs.vpc.values.private_subnet_ids)
  private_route_table_id = nonsensitive(data.tfe_outputs.vpc.values.private_route_table_id)
  cidr_block             = nonsensitive(data.tfe_outputs.vpc.values.cidr_block)
}


resource "aws_vpc_endpoint" "s3" {
  vpc_id          = local.vpc_id
  service_name    = "com.amazonaws.${var.region}.s3"
  route_table_ids = [local.private_route_table_id]

  tags = local.common_tags
}

resource "aws_vpc_endpoint" "sqs" {
  vpc_id            = local.vpc_id
  service_name      = "com.amazonaws.${var.region}.sqs"
  vpc_endpoint_type = "Interface"
  security_group_ids = [
    aws_security_group.container_security_group.id
  ]

  tags = local.common_tags
}

resource "aws_vpc_endpoint" "sns" {
  vpc_id            = local.vpc_id
  service_name      = "com.amazonaws.${var.region}.sns"
  vpc_endpoint_type = "Interface"
  security_group_ids = [
    aws_security_group.container_security_group.id
  ]

  tags = local.common_tags

}

resource "aws_vpc_endpoint" "ssm" {
  vpc_id             = local.vpc_id
  service_name       = "com.amazonaws.${var.region}.ssm"
  vpc_endpoint_type  = "Interface"
  security_group_ids = [
    aws_security_group.container_security_group.id
  ]

  tags = local.common_tags
}

resource "aws_vpc_endpoint_subnet_association" "sqs" {
  count         = length(local.private_subnet_ids)
  vpc_endpoint_id = aws_vpc_endpoint.sqs.id
  subnet_id       = local.private_subnet_ids[count.index]
}

resource "aws_vpc_endpoint_subnet_association" "sns" {
  count         = length(local.private_subnet_ids)
  vpc_endpoint_id = aws_vpc_endpoint.sns.id
  subnet_id       = local.private_subnet_ids[count.index]
}

resource "aws_vpc_endpoint_subnet_association" "ssm" {
  count         = length(local.private_subnet_ids)
  vpc_endpoint_id = aws_vpc_endpoint.ssm.id
  subnet_id       = local.private_subnet_ids[count.index]
}