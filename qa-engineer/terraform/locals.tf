locals {
  vpc_id             = var.vpc_id
  public_subnet_ids  = var.public_subnet_ids
  private_subnet_ids = var.private_subnet_ids

  cloudfront_host_names = [
    "todo.dev.cuvama.com"
  ]
  api_host_name         = "api-todo.dev.cuvama.com"
  website_host_name     = "todo.dev.cuvama.com"
  cors_allowed_origins  = [
    "https://todo.dev.cuvama.com"
  ]

  common_tags = {
    Environment = "qa-example"
  }
}
