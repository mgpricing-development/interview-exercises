locals {
  vpc_id             = var.vpc_id
  public_subnet_ids  = var.public_subnet_ids
  private_subnet_ids = var.private_subnet_ids

  cloudfront_host_names = [
    "interview-exercise.dev.cuvama.com"
  ]
  api_host_name         = "api-interview-exercise.dev.cuvama.com"
  website_host_name     = "interview-exercise.dev.cuvama.com"
  cors_allowed_origins  = [
    "https://interview-exercise.dev.cuvama.com"
  ]

  common_tags = {
    Environment = "interview-exercise"
  }
}
