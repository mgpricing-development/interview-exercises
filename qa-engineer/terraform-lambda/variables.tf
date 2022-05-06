variable "cidr_block" {
  type    = string
  default = ""
}

variable "vpc_id" {
  type = string
}

variable "private_subnet_ids" {
  type    = list(string)
  default = []
}

variable "basic_auth_username" {
  type = string
}

variable "basic_auth_password" {
  type = string
}

data "aws_caller_identity" "current" {}
