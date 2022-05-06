locals {
  vpc_id             = var.vpc_id
  private_subnet_ids = var.private_subnet_ids

  common_tags = {
    Environment = "interview-exercise"
  }
}
