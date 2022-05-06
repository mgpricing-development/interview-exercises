resource "aws_s3_bucket" "lambda_bucket" {
  acl = "private"
  bucket = "interview-exercise-lambda"
  tags = local.common_tags
}