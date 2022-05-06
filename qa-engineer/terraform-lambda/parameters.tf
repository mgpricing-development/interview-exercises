resource "aws_ssm_parameter" "basic_auth_username" {
  name        = "/interviewExercise/basicAuthUsername"
  description = "Basic Auth Username for Interview Exercise"
  type        = "String"
  value       = var.basic_auth_username

  tags = local.common_tags
}

resource "aws_ssm_parameter" "basic_auth_password" {
  name        = "/interviewExercise/basicAuthPassword"
  description = "Basic Auth Password for Interview Exercise"
  type        = "SecureString"
  value       = var.basic_auth_password

  tags = local.common_tags
}
