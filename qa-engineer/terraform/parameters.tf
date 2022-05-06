resource "aws_ssm_parameter" "basic_auth_username" {
  name        = "/interviewExercise/basicAuthUsername"
  description = "Name of the S3 Bucket for File Storage"
  type        = "SecureString"
  value       = var.basic_auth_username

  tags = local.common_tags
}

resource "aws_ssm_parameter" "basic_auth_password" {
  name        = "/interviewExercise/basicAuthPassword"
  description = "Name of the S3 Bucket for File Storage"
  type        = "SecureString"
  value       = var.basic_auth_password

  tags = local.common_tags
}


