variable "basic_auth_username" {
  type = string
}

variable "basic_auth_password" {
  type = string
}

data "aws_caller_identity" "current" {}
