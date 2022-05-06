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

data "aws_caller_identity" "current" {}
