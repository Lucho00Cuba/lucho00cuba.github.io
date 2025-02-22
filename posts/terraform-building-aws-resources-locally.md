---
title: "Terraform: Building AWS Resources Locally"
titleIcon: https://user-images.githubusercontent.com/31406378/108641411-f9374f00-7496-11eb-82a7-0fa2a9cc5f93.png
titleColor: "#5447e4,#3643ad,#0e51d6"
publishDate: "2025-02-23"
updatedDate: "2025-02-23"
tags: ["AWS", "Localstack", "Tutorial", "Terraform"]
categories: ["Tutorial", "AWS", "IaC"]
description: |
  In this post, we'll show you how to use Terraform to provision AWS resources like S3, Lambda, and DynamoDB in a LocalStack environment. You'll learn how to simulate a full AWS infrastructure locally, saving costs and simplifying development and testing before deploying to the cloud.
---

# Introduction

In this tutorial, we will walk through how to use Terraform to create AWS resources locally using LocalStack. LocalStack is a fully functional local AWS cloud stack that allows you to test and develop your AWS applications locally without the need for an actual AWS account. By combining LocalStack with Terraform, we can automate the creation and management of AWS resources such as S3 buckets, Lambda functions, IAM roles, DynamoDB tables, and more, all in a local environment.

# What is Terraform and How Does It Work?

Terraform is an open-source tool developed by HashiCorp that allows you to define and provision infrastructure as code (IaC). It uses configuration files written in HCL (HashiCorp Configuration Language) to define the desired state of your infrastructure. Terraform can manage various types of resources, including cloud infrastructure, networking, databases, and more.

When you run Terraform, it performs the following steps:

- Initialization (`terraform init`): Prepares the working directory for Terraform, downloads provider plugins, and initializes the backend.
- Planning (`terraform plan`): Shows a preview of the changes that will be made to the infrastructure based on your configuration files.
- Applying (`terraform apply`): Executes the changes and provisions the resources defined in the configuration files.
- Destroying (`terraform destroy`): Removes the resources defined in the configuration files.

With Terraform, you can manage your infrastructure efficiently and ensure consistency across environments, making it an essential tool for DevOps and Cloud Engineers.

# Why Use LocalStack with Terraform?

LocalStack allows you to emulate AWS services on your local machine, enabling you to test and develop AWS applications locally before deploying them to the actual AWS cloud. This is particularly useful in a local development environment, as it can save time and costs by reducing the need for AWS resources during the development and testing phases.

When combined with Terraform, LocalStack gives you the ability to manage and provision AWS-like resources locally with the same workflows and infrastructure-as-code principles that you would use in the cloud. This makes it easier to test your Terraform configurations without incurring costs or having to deploy to the cloud.

In this tutorial, we will use LocalStack to simulate AWS services, and Terraform will be used to provision resources such as S3, Lambda, IAM, DynamoDB, and Secrets Manager, all running locally.

# Prerequisites

Before we start, ensure you have the following tools installed:

- [Terraform](#installing-terraform): The tool we’ll use to define and provision infrastructure.
- [LocalStack](/posts/run-aws-locally): A fully functional local AWS cloud stack.
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html): We will use the AWS CLI to interact with LocalStack and verify the resources.

Once you have these tools installed, you’re ready to begin.

# Installing Terraform

To get started with Terraform, follow these steps to install it on your local machine.

:::::tabs

::::tab{title="macOS (via Homebrew)"}

```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

::::

::::tab{title="Linux (Debian/Ubuntu)"}

```bash
wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

::::

::::tab{title="Windows"}
Download the latest version of Terraform for Windows from the [HashiCorp website](https://www.terraform.io/downloads.html).
::::

:::::

After installing Terraform, verify the installation by running the following command:

```bash
terraform version
```

# Configuring Terraform for LocalStack

Before you can use Terraform with LocalStack, you need to configure the AWS provider to point to LocalStack instead of AWS. This configuration tells Terraform to interact with LocalStack’s local emulation of AWS services.

Create a new directory for your Terraform configuration files and navigate to it:

```bash
mkdir terraform-localstack
cd terraform-localstack
```

Next, create a file called `provider.tf` and `version.tf` in this directory with the following content:

```hcl
# ./terraform-localstack/provider.tf
provider "aws" {
  access_key                  = "test"
  secret_key                  = "test"
  region                      = "us-east-1"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    s3             = "http://s3.localhost.localstack.cloud:4566"
    lambda         = "http://localhost:4566"
    iam            = "http://localhost:4566"
    dynamodb       = "http://localhost:4566"
    secretsmanager = "http://localhost:4566"
  }
}
```

```hcl
# ./terraform-localstack/version.tf
terraform {
  required_version = ">= 1.3.7"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.60.0, <= 4.22.0"
    }
  }
}
```

In this configuration:

- The `access_key` and `secret_key` are set to "test" because LocalStack doesn’t require valid AWS credentials.
- The `endpoint` points to the LocalStack service running on your local machine (`localhost:4566`).
- For some services, they may need to be indicated in the endpoints section. [Documentation](https://docs.localstack.cloud/user-guide/integrations/terraform/)

## Initializing Terraform

Run the following command to initialize Terraform:

```bash
terraform init
```

# Creating an S3 Bucket with Terraform

Let’s start by creating an S3 bucket in LocalStack using Terraform. Create a new file called `s3.tf` in the `terraform-localstack` directory and add the following content:

```hcl
# ./terraform-localstack/s3.tf
resource "aws_s3_bucket" "example" {
  bucket = "my-localstack-bucket"
}
```

This Terraform resource block defines an S3 bucket named my-localstack-bucket.

## Running Terraform to Create the Resource

Run the following commands to plan and apply the changes:

```bash
terraform plan
terraform apply
```

The `terraform plan` command will show the changes Terraform intends to make. If everything looks good, run `terraform apply` to apply the changes and create the S3 bucket.

## Verifying the S3 Bucket with AWS CLI

Use the AWS CLI to check that the S3 bucket was created successfully. First, ensure the AWS CLI is configured to use LocalStack by setting the `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_DEFAULT_REGION` environment variables:

```bash
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1
```

Now, list the S3 buckets:

```bash
aws --endpoint-url=http://localhost:4566 s3 ls
```

You should see the bucket `my-localstack-bucket` in the output, confirming that the S3 bucket was created successfully.

# Creating a Lambda Function with Terraform

Next, let’s create a Lambda function using Terraform. Create a new file called `lambda.tf` in the `terraform-localstack` directory and add the following Lambda resource definition:

```hcl
# ./terraform-localstack/lambda.tf
data "archive_file" "lambda_artifact" {
  type        = "zip"
  output_path = "${path.root}/index.js"

  source {
    filename = "index.js"
    content  = <<-EOF
            exports.handler = async (event) => {
                console.log("Event:", event);
                return "Hello from Lambda!";
            };
        EOF
  }
}

resource "aws_lambda_function" "example" {
  function_name    = "my-localstack-lambda"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "index.handler"
  runtime          = "nodejs14.x"
  filename         = data.archive_file.lambda_artifact.output_path
  source_code_hash = data.archive_file.lambda_artifact.output_base64sha256
  depends_on       = [aws_iam_role.lambda_exec]
}
```

This example defines a simple Lambda function written in Node.js.

## Creating the IAM Role for Lambda with Terraform

Before applying the Lambda function, we need to create an IAM role for the Lambda function. Add this IAM role resource to your `lambda.tf` file:

```hcl
# ./terraform-localstack/lambda.tf
resource "aws_iam_role" "lambda_exec" {
  name = "lambda_exec_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
}
```

## Running Terraform to Create the Resources

Now that the Lambda function and IAM role are defined, run `terraform plan` and `terraform apply` again:

```bash
terraform init -upgrade # provider local archive_file
terraform plan
terraform apply
```

## Verifying the Lambda Function with AWS CLI

To verify that the Lambda function was created successfully, invoke the Lambda function using the AWS CLI:

```bash
aws --endpoint-url=http://localhost:4566 lambda invoke --function-name my-localstack-lambda output.txt
```

Check the output.txt file for the response from the Lambda function:

```bash
cat output.txt
```

You should see the result `"Hello from Lambda!"` confirming that the Lambda function executed successfully.

# Creating IAM Role with Terraform

Let’s now create an IAM role using Terraform. Add the following IAM role definition in new file called `iam.tf` in the `terraform-localstack` directory:

```hcl
# ./terraform-localstack/iam.tf
resource "aws_iam_role" "example" {
  name = "my-localstack-iam-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })
}
```

## Running Terraform to Create the IAM Role

Run `terraform plan` and `terraform apply` to create the IAM role:

```bash
terraform plan
terraform apply
```

## Verifying the IAM Role with AWS CLI

You can verify that the IAM role was created by using the AWS CLI to list the roles:

```bash
aws --endpoint-url=http://localhost:4566 iam list-roles
```

The output should include the `my-localstack-iam-role`.

# Creating DynamoDB Table  with Terraform

Next, let’s create a DynamoDB table with Terraform. Add the following DynamoDB table definition in new file called `dynamodb.tf` in the `terraform-localstack` directory:

```hcl
# ./terraform-localstack/dynamodb.tf
resource "aws_dynamodb_table" "example" {
  name         = "my-localstack-table"
  hash_key     = "id"
  billing_mode = "PAY_PER_REQUEST"
  attribute {
    name = "id"
    type = "S"
  }
}
```

## Running Terraform to Create the DynamoDB Table

Run `terraform plan` and `terraform apply` to create the DynamoDB table:

```bash
terraform plan
terraform apply
```

## Verifying the DynamoDB Table with AWS CLI

To verify that the DynamoDB table was created, use the AWS CLI to list the tables:

```bash
aws --endpoint-url=http://localhost:4566 dynamodb list-tables
```

You should see the table `my-localstack-table` in the output.

# Creating Secrets Manager Secret with Terraform

Finally, let’s create a Secrets Manager secret using Terraform. Add the following secret definition in new file called `secrets.tf` in the `terraform-localstack` directory:

```hcl
# ./terraform-localstack/secrets.tf
resource "aws_secretsmanager_secret" "example" {
  name        = "my-localstack-secret"
  description = "A test secret"
}

resource "aws_secretsmanager_secret_version" "example" {
  secret_id = aws_secretsmanager_secret.example.id
  secret_string = jsonencode({
    name     = "localstack"
    username = "admin"
    password = "supersecret"
  })
}
```

## Running Terraform to Create the Secret

Run `terraform plan` and `terraform apply` to create the secret:

```bash
terraform plan
terraform apply
```

## Verifying the Secret with AWS CLI

To verify that the secret was created successfully, use the AWS CLI to retrieve it:

```bash
aws --endpoint-url=http://localhost:4566 secretsmanager get-secret-value --secret-id my-localstack-secret

```

You should see the secret’s value in the output, confirming that the secret was created.

# Conclusion

In this tutorial, we demonstrated how to use Terraform with LocalStack to create AWS resources such as S3, Lambda, IAM, DynamoDB, and Secrets Manager. By leveraging Terraform and LocalStack together, you can simulate an entire AWS environment locally, making it easier to develop, test, and validate infrastructure before deploying it to the cloud.

This combination enables you to reduce cloud costs, increase development speed, and ensure that your configurations are correct without the need to provision actual AWS resources. With LocalStack and Terraform, you can build a seamless, cost-effective local development environment that mimics AWS in production.

Stay tuned for upcoming posts! 🚀