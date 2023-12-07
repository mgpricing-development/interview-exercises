locals {
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
