resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
}

resource "aws_s3_bucket" "website_bucket" {
  acl = "private"
  bucket = "interview-exercise-website"

  tags = local.common_tags
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = <<EOF
{
"Version": "2008-10-17",
"Statement": [
    {
        "Sid": "2",
        "Effect": "Allow",
        "Principal": {
            "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${aws_cloudfront_origin_access_identity.origin_access_identity.id}"
        },
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::interview-exercise-website/*"
    }
  ]
}
EOF
}

locals {
  website_s3_origin_id = "website-s3"
}

resource "aws_cloudfront_distribution" "distribution" {
  origin {
    domain_name = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_id = local.website_s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled = true
  aliases = local.cloudfront_host_names

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD",
      "OPTIONS"]
    cached_methods = [
      "GET",
      "HEAD"]
    target_origin_id = local.website_s3_origin_id
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    dynamic "lambda_function_association" {
      for_each = var.basic_auth_username != "" ? [] : tolist([1])

      content {
        event_type = "viewer-request"
        lambda_arn = var.lambda_at_edge_arn
      }
    }

    lambda_function_association {
      event_type = "origin-request"
      lambda_arn = var.lambda_at_edge_arn
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = false
    minimum_protocol_version = "TLSv1.2_2019"
    acm_certificate_arn = var.cloudfront_certificate_arn
    ssl_support_method = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = local.common_tags
}

resource "aws_route53_record" "cloudfront_route_53_cname" {
  zone_id = var.host_zone_id
  name = local.website_host_name
  type = "CNAME"
  ttl = "300"
  records = [aws_cloudfront_distribution.distribution.domain_name]
}
