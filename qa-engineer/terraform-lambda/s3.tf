resource "aws_s3_bucket" "lambda_bucket" {
  acl = "private"
  bucket = "interview-exercise-cuvama-lambda"
  tags = local.common_tags
}