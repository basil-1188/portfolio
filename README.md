# Serverless Portfolio with Contact Form — AWS

![Live](https://img.shields.io/badge/Status-Live-brightgreen)
![AWS](https://img.shields.io/badge/AWS-Free%20Tier-orange)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue)

🌐 **Live Site:** https://d1ciiv3x1cw79m.cloudfront.net

---

## What This Is

A fully serverless portfolio website with a working contact form. Built on AWS Free Tier. Auto-deployed via GitHub Actions CI/CD on every push to main.

---

## AWS Services Used

| Service | Role |
|---------|------|
| S3 | Hosts static frontend with versioning |
| CloudFront | HTTPS + global CDN — 400+ edge locations |
| API Gateway | REST endpoint — POST /contact |
| Lambda | Python backend — processes form and sends email |
| SES | Sends real email on form submission |
| IAM | Least-privilege execution role |
| CloudWatch | Monitors invocations, errors, duration |

---

## Architecture

User → CloudFront → S3 (Frontend)
Form Submit → API Gateway → Lambda → SES → Email
GitHub Push → GitHub Actions → S3 Sync → CloudFront Invalidation
---

## Key Features

- ✅ Working contact form — sends real emails via SES
- ✅ HTTPS via CloudFront CDN
- ✅ CORS configured on Lambda and API Gateway
- ✅ IAM least-privilege permissions
- ✅ CloudWatch dashboard + SNS error alarm
- ✅ GitHub Actions CI/CD — live in 60 seconds on every push

---

## CloudWatch Monitoring

![CloudWatch Dashboard](cloudwatch.png)

---

## Author

**Basil MK** — MCA Graduate | Cloud & DevOps Engineer

[![GitHub](https://img.shields.io/badge/GitHub-basil--1188-black?logo=github)](https://github.com/basil-1188)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Basil%20MK-blue?logo=linkedin)](https://www.linkedin.com/in/basil-m-k-7381aa291)
[![Live](https://img.shields.io/badge/Portfolio-Live-brightgreen)](https://d1ciiv3x1cw79m.cloudfront.net)

---

## Architecture
