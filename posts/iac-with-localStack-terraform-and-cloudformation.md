---
title: "IaC with LocalStack: Terraform & CloudFormation"
titleIcon: https://raw.githubusercontent.com/localstack/branding/refs/heads/main/Web%20Logos%20(RGB)/SVG/Icon/localstack-logo-icon-color.svg
# titleColor: "#0998DF"
titleColor: "#6ad2e3,#6e9bfa,#6f56e4"
publishDate: '2025-02-21'
updatedDate: '2025-02-21'
tags: ["AWS", "Localstack", "Tutorial", "Terraform", "CloudFormation"]
categories: ["Tutorial", "AWS", "IaC"]
description: |
  In this tutorial, you'll learn how to use LocalStack to create and test AWS infrastructure using both Terraform and CloudFormation. This step-by-step guide will help you set up the environment and deploy resources locally.
---

# Introduction

Infrastructure as Code (IaC) is a crucial concept in cloud architecture and DevOps, enabling the automation and consistency of infrastructure management through configuration files. Two popular IaC tools are Terraform and CloudFormation, which allow you to manage AWS resources. While they differ in syntax and features, both can be used with LocalStack to test and validate configurations locally before deployment, saving time and costs.

## Why Use Terraform and CloudFormation with LocalStack?

LocalStack is a powerful tool that allows you to run a local instance of AWS services on your machine. This is particularly useful when developing and testing AWS-based applications, as it enables you to simulate AWS resources and operations without the need to incur any costs.

By combining LocalStack with **Terraform** and **CloudFormation**, you can test your IaC scripts locally, without needing to deploy to a real AWS account. This gives you the ability to:
- Verify that your configurations are correct before deployment.
- Test resources in a safe and cost-free environment.
- Debug and iterate faster without incurring AWS costs.
- Use LocalStack’s simplicity and speed for efficient testing and development workflows.

By the end of this post, you will have a clear understanding of how to use LocalStack for testing IaC configurations and how to leverage it for faster, cost-effective development.

## Prerequisites

Before getting started, there are a few things you'll need to set up on your local machine:

- [LocalStack](/posts/run-aws-locally/)
- [Terraform](#terraform-installation)
- [CloudFormation](#cloudformation-installation-optional)

## Terraform Installation

To follow along with the Terraform example, you’ll need to have Terraform installed. Terraform is a tool that allows you to define and provision AWS infrastructure using configuration files.

:::::tabs

::::tab{title="macOS (via Homebrew)"}
```bash
brew install terraform
```
::::

::::tab{title="Windows"}
```powershell
choco install terraform
```

:::note{type=warn}
Chocolatey and the Terraform package are NOT directly maintained by HashiCorp. The latest version of Terraform is always available by manual installation.
:::

::::

::::tab{title="Linux"}
Follow the instructions for your specific distribution on the [Terraform Install Page](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli).
::::

:::::

## CloudFormation Installation (Optional)

While we will focus on Terraform in this tutorial, if you plan to use CloudFormation templates, you need to ensure the AWS CLI is installed and configured. You can follow these steps:

Install the AWS CLI by following the instructions for your operating system from the [official AWS CLI documentation](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

Verify the AWS CLI is installed:

```bash
aws --version
```

# Creating Resources with Terraform on LocalStack

## Terraform Configuration

To begin, let’s configure Terraform to interact with LocalStack. You'll need to create a Terraform configuration file that defines the resources you want to provision. For this example, we will create an S3 bucket.

Create a file called `main.tf` and add the following content:

```terraform
provider "aws" {
  access_key                  = "test"
  secret_key                  = "test"
  region                      = "us-east-1"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  s3_use_path_style           = false

  endpoints {
    s3 = "http://s3.localhost.localstack.cloud:4566"
  }
}

resource "aws_s3_bucket" "example_bucket" {
  bucket = "localstack-example-bucket"
}
```

## Initializing Terraform

Once your main.tf file is ready, initialize Terraform to download the necessary provider plugins:

```bash
terraform init
```

This will set up Terraform for use with your configuration.

## Applying Terraform Plan

Next, run the following command to create the S3 bucket in LocalStack:

```bash
terraform apply
```

Terraform will prompt you to confirm the action. Type yes to proceed. After the resources are created, Terraform will display the outputs, including any resources it created.

## Verifying Created Resources via AWS CLI (awslocal)

To verify the S3 bucket creation, you can use the awslocal command:

```bash
awslocal s3 ls
```

This will list all the S3 buckets created in LocalStack. You should see your localstack-example-bucket listed here.

# Creating Resources with CloudFormation on LocalStack

## CloudFormation Template Setup

Next, we’ll create an S3 bucket using CloudFormation. Start by writing a simple CloudFormation template in YAML format. Create a file called `s3-template.yaml`:

```yaml
# s3-template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  ExampleBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: localstack-example-bucket
```

This template defines an S3 bucket named localstack-example-bucket-cf.

## Deploying CloudFormation Stack on LocalStack

To deploy this stack to LocalStack, use the AWS CLI or awslocal. Run the following command:

```bash
awslocal cloudformation create-stack --stack-name example-stack --template-body file://s3-template.yaml
```

This command will deploy the CloudFormation stack locally and create the S3 bucket defined in the template.

## Verifying Resources with AWS CLI (awslocal)

Once the stack is created, you can verify the resources by running:

```bash
awslocal s3 ls
```

This will show the bucket localstack-example-bucket-cf created by CloudFormation.

Additionally, you can see stacks in cloud formation by running:

```bash
awslocal cloudformation list-stacks
```

This will show all the stacks that are currently deployed in LocalStack.

# Comparing Terraform and CloudFormation

## Pros and Cons of Terraform vs CloudFormation
Both Terraform and CloudFormation are powerful tools for defining AWS infrastructure, but they have different strengths:

- Terraform:
  - Multi-cloud Support: Terraform works not only with AWS but also with other cloud providers such as Azure, Google Cloud, and more.
  - State Management: Terraform manages state locally or remotely (via backends like S3), which makes it easy to track and manage resources over time.
  - Modularity: Terraform allows you to create reusable modules for your infrastructure, making it easier to scale and manage.
- CloudFormation:
  - AWS Native: CloudFormation is fully integrated with AWS, allowing you to leverage AWS-specific features such as StackSets and ChangeSets.
  - Managed by AWS: CloudFormation is AWS’s native service, so it is maintained by AWS and has direct support for all AWS features.
  - Less Flexibility: CloudFormation is AWS-specific and lacks the cross-cloud flexibility of Terraform.

## Use Cases for Each Tool

- Use Terraform if you want a multi-cloud solution and prefer a declarative configuration style with rich provider support.
- Use CloudFormation if you are working primarily within AWS and want to leverage AWS-native features, with deep integration into AWS services.

# Conclusion

In this tutorial, we explored how to use LocalStack to create and test AWS infrastructure using both Terraform and CloudFormation. We covered the basics of setting up LocalStack, creating resources with Terraform and CloudFormation, and comparing the two tools. By the end of this post, you should have a clear understanding of how to use LocalStack for testing IaC configurations and how to leverage it for faster, cost-effective development.

In the next article, we will focus exclusively on Terraform and how to create complex infrastructure, such as API REST services, Lambda functions, IAM roles, and more. Stay tuned for an in-depth guide! 🚀