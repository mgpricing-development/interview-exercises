variable "region" {
  type    = string
  default = "eu-west-1"
}

variable "environment_name" {
  type    = string
  default = "dev"
}

variable "cloudfront_certificate_arn" {
  type = string
}

variable "api_certificate_arn" {
  type = string
}

variable "host_zone_id" {
  type = string
}

variable "lambda_at_edge_arn" {
  type    = string
  default = ""
}

variable "docker_port_number" {
  type    = number
  default = 3000
}

variable "desired_count" {
  type    = number
  default = 1
}

data "aws_caller_identity" "current" {}
