variable "region" {
  type    = string
  default = "eu-west-1"
}

variable "cidr_block" {
  type    = string
  default = ""
}

variable "public_subnet_cidr_blocks" {
  type    = list(string)
  default = []
}

variable "private_subnet_cidr_blocks" {
  type    = list(string)
  default = []
}

variable "availability_zones" {
  type    = list(string)
  default = []
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

variable "basic_auth_username" {
  type    = string
  default = ""
}

variable "basic_auth_password" {
  type    = string
  default = ""
}

variable "docker_port_number" {
  type    = number
  default = 3000
}

variable "vpc_id" {
  type = string
}

variable "public_subnet_ids" {
  type    = list(string)
  default = []
}

variable "private_subnet_ids" {
  type    = list(string)
  default = []
}

variable "desired_count" {
  type    = number
  default = 0
}

data "aws_caller_identity" "current" {}
