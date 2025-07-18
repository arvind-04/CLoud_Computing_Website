"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Terminal, Cloud, Server, Globe, Code, FileText, Shield, Cpu, X } from "lucide-react"

const activities = {
  activity1: {
    title: "Activity 1: Launch Static Website on S3 - ByteWave Solutions",
    description: "Host a basic HTML webpage on AWS S3 bucket using Terraform",
    icon: <Globe className="w-5 h-5" />,
    color: "bg-blue-500",
    mainTf: `provider "aws" {
  region = "us-east-1"
}

variable "bucket_name" {
  default = "bytewave-website-as" # Change 'as' to your initials
}

resource "aws_s3_bucket" "website" {
  bucket = var.bucket_name
  website {
    index_document = "index.html"
  }
  tags = {
    Name = "ByteWave Website"
  }
}

resource "aws_s3_bucket_public_access_block" "block" {
  bucket = aws_s3_bucket.website.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "policy" {
  bucket = aws_s3_bucket.website.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "PublicReadGetObject",
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "\${aws_s3_bucket.website.arn}/*"
      }
    ]
  })
}

output "website_endpoint" {
  value = aws_s3_bucket.website.website_endpoint
}`,
    indexHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>ByteWave Solutions</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #f0f4ff, #d4e0ff);
      color: #333;
    }
    header {
      background-color: #004080;
      color: white;
      padding: 20px 40px;
      text-align: center;
    }
    h1 {
      margin: 0;
      font-size: 2.5em;
    }
    main {
      padding: 40px;
      max-width: 800px;
      margin: auto;
      text-align: center;
    }
    .card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      margin: 20px auto;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    footer {
      background-color: #00254d;
      color: white;
      text-align: center;
      padding: 15px;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <header>
    <h1>ByteWave Solutions</h1>
    <p>Your trusted partner in digital transformation</p>
  </header>
  <main>
    <div class="card">
      <h2>Our Mission</h2>
      <p>Empowering businesses with scalable, secure, and smart cloud solutions. We deliver innovation with simplicity.</p>
    </div>
    <div class="card">
      <h2>What We Offer</h2>
      <ul style="list-style: none; padding-left: 0;">
        <li>✅ Cloud Consulting</li>
        <li>✅ DevOps & Automation</li>
        <li>✅ Serverless Architecture</li>
        <li>✅ AI-Driven Applications</li>
      </ul>
    </div>
    <div class="card">
      <h2>Contact Us</h2>
      <p>Email: <a href="mailto:info@bytewave.com">info@bytewave.com</a></p>
      <p>Website: <a href="https://bytewave.com" target="_blank">www.bytewave.com</a></p>
    </div>
  </main>
  <footer>
    &copy; 2025 ByteWave Solutions. All rights reserved.
  </footer>
</body>
</html>`,
    screenshot: "/images/bytewave-website.png",
  },
  activity2: {
    title: "Activity 2: Deploy EC2 Dev Server with Python - CloudNova Inc.",
    description: "Provision a development EC2 instance with essential tools using Terraform",
    icon: <Server className="w-5 h-5" />,
    color: "bg-orange-500",
    mainTf: `provider "aws" {
  region = "us-east-1"
}

resource "aws_key_pair" "deployer" {
  key_name   = "cloudnova-key"
  public_key = file("~/.ssh/cloudnova-key.pub")
}

resource "aws_security_group" "dev_sg" {
  name        = "dev-ssh-sg"
  description = "Allow SSH"
  
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

data "aws_ami" "amazon_linux" {
  most_recent = true
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
  owners = ["137112412989"] # Amazon
}

resource "aws_instance" "dev_server" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t2.micro"
  key_name      = aws_key_pair.deployer.key_name
  security_groups = [aws_security_group.dev_sg.name]
  
  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y python3 git
            EOF
  
  tags = {
    Name = "CloudNova Dev Server"
  }
}

output "ec2_public_ip" {
  value = aws_instance.dev_server.public_ip
}`,
    screenshot: "/images/aws-console.png",
  },
}

const awsServiceConfigs = {
  "Amazon EC2": {
    code: `provider "aws" {
  region = "us-east-1"
}

# Get the latest Amazon Linux 2 AMI
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
  
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# Create a security group
resource "aws_security_group" "ec2_sg" {
  name        = "ec2-security-group"
  description = "Security group for EC2 instance"
  
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "EC2-SecurityGroup"
  }
}

# Launch EC2 instance
resource "aws_instance" "web_server" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t2.micro"
  security_groups = [aws_security_group.ec2_sg.name]
  
  tags = {
    Name = "WebServer"
  }
}

output "instance_id" {
  value = aws_instance.web_server.id
}

output "public_ip" {
  value = aws_instance.web_server.public_ip
}`,
    description:
      "Launch a t2.micro EC2 instance with Amazon Linux 2, including security group configuration for SSH access.",
  },
  "Amazon VPC": {
    code: `provider "aws" {
  region = "us-east-1"
}

# Create VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "main-vpc"
  }
}

# Create Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "main-igw"
  }
}

# Create public subnet
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
  
  tags = {
    Name = "public-subnet"
  }
}

# Create route table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  
  tags = {
    Name = "public-rt"
  }
}

# Associate route table with subnet
resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

output "vpc_id" {
  value = aws_vpc.main.id
}

output "subnet_id" {
  value = aws_subnet.public.id
}`,
    description:
      "Create a custom VPC with CIDR 10.0.0.0/16, one public subnet, Internet Gateway, and proper routing configuration.",
  },
  "AWS Lambda": {
    code: `provider "aws" {
  region = "us-east-1"
}

# Create IAM role for Lambda
resource "aws_iam_role" "lambda_role" {
  name = "lambda_execution_role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Attach basic execution policy
resource "aws_iam_role_policy_attachment" "lambda_basic" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_role.name
}

# Create Lambda function
resource "aws_lambda_function" "hello_world" {
  filename         = "lambda_function.zip"
  function_name    = "hello_world_function"
  role            = aws_iam_role.lambda_role.arn
  handler         = "lambda_function.lambda_handler"
  runtime         = "python3.9"
  
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  
  tags = {
    Name = "HelloWorldLambda"
  }
}

# Create zip file for Lambda code
data "archive_file" "lambda_zip" {
  type        = "zip"
  output_path = "lambda_function.zip"
  source {
    content = <<EOF
def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'body': 'Hello World from Lambda!'
    }
EOF
    filename = "lambda_function.py"
  }
}

output "lambda_function_name" {
  value = aws_lambda_function.hello_world.function_name
}

output "lambda_function_arn" {
  value = aws_lambda_function.hello_world.arn
}`,
    description:
      "Create a simple Python Lambda function that returns 'Hello World', including IAM role and execution permissions.",
  },
  "Amazon S3": {
    code: `provider "aws" {
  region = "us-east-1"
}

# Create S3 bucket
resource "aws_s3_bucket" "private_bucket" {
  bucket = "my-private-bucket-\${random_string.bucket_suffix.result}"
  
  tags = {
    Name = "PrivateBucket"
  }
}

# Generate random suffix for bucket name
resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

# Configure bucket versioning
resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.private_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Block public access
resource "aws_s3_bucket_public_access_block" "private_bucket_pab" {
  bucket = aws_s3_bucket.private_bucket.id
  
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Configure server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "encryption" {
  bucket = aws_s3_bucket.private_bucket.id
  
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

output "bucket_name" {
  value = aws_s3_bucket.private_bucket.bucket
}

output "bucket_arn" {
  value = aws_s3_bucket.private_bucket.arn
}`,
    description:
      "Create a private S3 bucket with versioning enabled, public access blocked, and server-side encryption configured.",
  },
  "Amazon EBS": {
    code: `provider "aws" {
  region = "us-east-1"
}

# Get the latest Amazon Linux 2 AMI
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
  
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# Create EC2 instance
resource "aws_instance" "web_server" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t2.micro"
  
  tags = {
    Name = "WebServer-with-EBS"
  }
}

# Create EBS volume
resource "aws_ebs_volume" "additional_storage" {
  availability_zone = aws_instance.web_server.availability_zone
  size              = 10
  type              = "gp2"
  
  tags = {
    Name = "AdditionalStorage"
  }
}

# Attach EBS volume to EC2 instance
resource "aws_volume_attachment" "ebs_attachment" {
  device_name = "/dev/sdf"
  volume_id   = aws_ebs_volume.additional_storage.id
  instance_id = aws_instance.web_server.id
}

output "instance_id" {
  value = aws_instance.web_server.id
}

output "volume_id" {
  value = aws_ebs_volume.additional_storage.id
}

output "attachment_device" {
  value = aws_volume_attachment.ebs_attachment.device_name
}`,
    description:
      "Create an EC2 instance and attach a 10GB EBS volume to it. The volume will be available as /dev/sdf on the instance.",
  },
  "Amazon RDS": {
    code: `provider "aws" {
  region = "us-east-1"
}

# Create DB subnet group
resource "aws_db_subnet_group" "main" {
  name       = "main-db-subnet-group"
  subnet_ids = [aws_subnet.private_1.id, aws_subnet.private_2.id]
  
  tags = {
    Name = "Main DB subnet group"
  }
}

# Get default VPC
data "aws_vpc" "default" {
  default = true
}

# Get default subnets
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# Create security group for RDS
resource "aws_security_group" "rds_sg" {
  name        = "rds-security-group"
  description = "Security group for RDS instance"
  vpc_id      = data.aws_vpc.default.id
  
  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [data.aws_vpc.default.cidr_block]
  }
  
  tags = {
    Name = "RDS-SecurityGroup"
  }
}

# Create RDS instance
resource "aws_db_instance" "mysql_db" {
  identifier     = "mysql-database"
  engine         = "mysql"
  engine_version = "8.0"
  instance_class = "db.t3.micro"
  
  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp2"
  storage_encrypted     = false
  
  db_name  = "testdb"
  username = "admin"
  password = "password123"
  
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = true
  
  tags = {
    Name = "MySQL-Database"
  }
}

output "rds_endpoint" {
  value = aws_db_instance.mysql_db.endpoint
}

output "rds_port" {
  value = aws_db_instance.mysql_db.port
}`,
    description:
      "Create a MySQL RDS instance (db.t3.micro) with proper security group configuration and backup settings.",
  },
  "Amazon Athena": {
    code: `provider "aws" {
  region = "us-east-1"
}

# Create S3 bucket for Athena query results
resource "aws_s3_bucket" "athena_results" {
  bucket = "athena-query-results-\${random_string.bucket_suffix.result}"
  
  tags = {
    Name = "AthenaQueryResults"
  }
}

resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

# Create S3 bucket for sample data
resource "aws_s3_bucket" "sample_data" {
  bucket = "athena-sample-data-\${random_string.bucket_suffix.result}"
  
  tags = {
    Name = "AthenaSampleData"
  }
}

# Upload sample CSV data
resource "aws_s3_object" "sample_csv" {
  bucket = aws_s3_bucket.sample_data.bucket
  key    = "data/sample.csv"
  content = <<EOF
id,name,age,city
1,John Doe,30,New York
2,Jane Smith,25,Los Angeles
3,Bob Johnson,35,Chicago
4,Alice Brown,28,Houston
EOF
  content_type = "text/csv"
}

# Create Athena database
resource "aws_athena_database" "sample_db" {
  name   = "sample_database"
  bucket = aws_s3_bucket.athena_results.bucket
}

# Create Athena workgroup
resource "aws_athena_workgroup" "main" {
  name = "primary"
  
  configuration {
    enforce_workgroup_configuration    = true
    publish_cloudwatch_metrics_enabled = true
    
    result_configuration {
      output_location = "s3://\${aws_s3_bucket.athena_results.bucket}/query-results/"
      
      encryption_configuration {
        encryption_option = "SSE_S3"
      }
    }
  }
  
  tags = {
    Name = "Primary Workgroup"
  }
}

output "athena_database" {
  value = aws_athena_database.sample_db.name
}

output "sample_data_bucket" {
  value = aws_s3_bucket.sample_data.bucket
}

output "query_results_bucket" {
  value = aws_s3_bucket.athena_results.bucket
}`,
    description:
      "Create Athena database with sample CSV data in S3, query results bucket, and workgroup configuration.",
  },
  "Amazon CloudWatch": {
    code: `provider "aws" {
  region = "us-east-1"
}

# Get existing EC2 instance (you need to have one running)
data "aws_instances" "existing" {
  instance_state_names = ["running"]
}

# Create SNS topic for alarm notifications
resource "aws_sns_topic" "cpu_alarm" {
  name = "ec2-cpu-alarm"
  
  tags = {
    Name = "EC2-CPU-Alarm-Topic"
  }
}

# Create SNS topic subscription (email)
resource "aws_sns_topic_subscription" "email_notification" {
  topic_arn = aws_sns_topic.cpu_alarm.arn
  protocol  = "email"
  endpoint  = "your-email@example.com"  # Replace with your email
}

# Create CloudWatch alarm for EC2 CPU utilization
resource "aws_cloudwatch_metric_alarm" "high_cpu" {
  alarm_name          = "ec2-high-cpu-utilization"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "300"
  statistic           = "Average"
  threshold           = "70"
  alarm_description   = "This metric monitors ec2 cpu utilization"
  alarm_actions       = [aws_sns_topic.cpu_alarm.arn]
  
  dimensions = {
    InstanceId = length(data.aws_instances.existing.ids) > 0 ? data.aws_instances.existing.ids[0] : "i-1234567890abcdef0"
  }
  
  tags = {
    Name = "EC2-High-CPU-Alarm"
  }
}

# Create CloudWatch dashboard
resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "EC2-Monitoring"
  
  dashboard_body = jsonencode({
    widgets = [
      {
        type   = "metric"
        x      = 0
        y      = 0
        width  = 12
        height = 6
        
        properties = {
          metrics = [
            ["AWS/EC2", "CPUUtilization", "InstanceId", length(data.aws_instances.existing.ids) > 0 ? data.aws_instances.existing.ids[0] : "i-1234567890abcdef0"]
          ]
          view    = "timeSeries"
          stacked = false
          region  = "us-east-1"
          title   = "EC2 CPU Utilization"
          period  = 300
        }
      }
    ]
  })
}

output "alarm_name" {
  value = aws_cloudwatch_metric_alarm.high_cpu.alarm_name
}

output "sns_topic_arn" {
  value = aws_sns_topic.cpu_alarm.arn
}

output "dashboard_url" {
  value = "https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#dashboards:name=\${aws_cloudwatch_dashboard.main.dashboard_name}"
}`,
    description:
      "Create CloudWatch alarm for EC2 CPU utilization > 70%, SNS topic for notifications, and monitoring dashboard.",
  },
  "AWS CloudTrail": {
    code: `provider "aws" {
  region = "us-east-1"
}

# Create S3 bucket for CloudTrail logs
resource "aws_s3_bucket" "cloudtrail_logs" {
  bucket = "cloudtrail-logs-\${random_string.bucket_suffix.result}"
  
  tags = {
    Name = "CloudTrailLogs"
  }
}

resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

# Configure bucket policy for CloudTrail
resource "aws_s3_bucket_policy" "cloudtrail_bucket_policy" {
  bucket = aws_s3_bucket.cloudtrail_logs.id
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AWSCloudTrailAclCheck"
        Effect = "Allow"
        Principal = {
          Service = "cloudtrail.amazonaws.com"
        }
        Action   = "s3:GetBucketAcl"
        Resource = aws_s3_bucket.cloudtrail_logs.arn
      },
      {
        Sid    = "AWSCloudTrailWrite"
        Effect = "Allow"
        Principal = {
          Service = "cloudtrail.amazonaws.com"
        }
        Action   = "s3:PutObject"
        Resource = "\${aws_s3_bucket.cloudtrail_logs.arn}/*"
        Condition = {
          StringEquals = {
            "s3:x-amz-acl" = "bucket-owner-full-control"
          }
        }
      }
    ]
  })
}

# Create CloudTrail
resource "aws_cloudtrail" "main" {
  depends_on = [aws_s3_bucket_policy.cloudtrail_bucket_policy]
  
  name           = "main-cloudtrail"
  s3_bucket_name = aws_s3_bucket.cloudtrail_logs.bucket
  
  event_selector {
    read_write_type                 = "All"
    include_management_events       = true
    exclude_management_event_sources = []
    
    data_resource {
      type   = "AWS::S3::Object"
      values = ["arn:aws:s3:::*/*"]
    }
  }
  
  tags = {
    Name = "MainCloudTrail"
  }
}

output "cloudtrail_name" {
  value = aws_cloudtrail.main.name
}

output "cloudtrail_arn" {
  value = aws_cloudtrail.main.arn
}

output "s3_bucket_name" {
  value = aws_s3_bucket.cloudtrail_logs.bucket
}`,
    description: "Enable CloudTrail to monitor API activity with S3 bucket for log storage and proper IAM permissions.",
  },
  "AWS CloudFormation": {
    code: `provider "aws" {
  region = "us-east-1"
}

# Create CloudFormation stack
resource "aws_cloudformation_stack" "ec2_stack" {
  name = "ec2-instance-stack"
  
  template_body = jsonencode({
    AWSTemplateFormatVersion = "2010-09-09"
    Description = "Simple EC2 instance created via CloudFormation"
    
    Resources = {
      EC2Instance = {
        Type = "AWS::EC2::Instance"
        Properties = {
          ImageId      = "ami-0c02fb55956c7d316"  # Amazon Linux 2
          InstanceType = "t2.micro"
          Tags = [
            {
              Key   = "Name"
              Value = "CloudFormation-EC2"
            }
          ]
        }
      }
      
      SecurityGroup = {
        Type = "AWS::EC2::SecurityGroup"
        Properties = {
          GroupDescription = "Security group for CloudFormation EC2"
          SecurityGroupIngress = [
            {
              IpProtocol = "tcp"
              FromPort   = 22
              ToPort     = 22
              CidrIp     = "0.0.0.0/0"
            }
          ]
          Tags = [
            {
              Key   = "Name"
              Value = "CloudFormation-SG"
            }
          ]
        }
      }
    }
    
    Outputs = {
      InstanceId = {
        Description = "Instance ID of the created EC2 instance"
        Value = {
          Ref = "EC2Instance"
        }
      }
      
      SecurityGroupId = {
        Description = "Security Group ID"
        Value = {
          Ref = "SecurityGroup"
        }
      }
    }
  })
  
  tags = {
    Name = "EC2-CloudFormation-Stack"
  }
}

output "stack_name" {
  value = aws_cloudformation_stack.ec2_stack.name
}

output "stack_id" {
  value = aws_cloudformation_stack.ec2_stack.id
}

output "stack_outputs" {
  value = aws_cloudformation_stack.ec2_stack.outputs
}`,
    description: "Deploy a CloudFormation stack that creates an EC2 instance and security group using JSON template.",
  },
  "AWS CDK": {
    code: `# First, install AWS CDK and create a new project:
# npm install -g aws-cdk
# mkdir cdk-s3-project && cd cdk-s3-project
# cdk init app --language typescript

# app.ts (CDK TypeScript code)
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class CdkS3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket
    const bucket = new s3.Bucket(this, 'CdkS3Bucket', {
      bucketName: 'cdk-s3-bucket-' + Math.random().toString(36).substring(7),
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Output bucket name
    new cdk.CfnOutput(this, 'BucketName', {
      value: bucket.bucketName,
      description: 'Name of the S3 bucket created by CDK',
    });
  }
}

const app = new cdk.App();
new CdkS3Stack(app, 'CdkS3Stack');

# Terraform equivalent for CDK deployment
provider "aws" {
  region = "us-east-1"
}

# Create S3 bucket using Terraform (CDK alternative)
resource "aws_s3_bucket" "cdk_style_bucket" {
  bucket = "cdk-style-bucket-\${random_string.bucket_suffix.result}"
  
  tags = {
    Name = "CDK-Style-Bucket"
    CreatedBy = "Terraform-CDK-Alternative"
  }
}

resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

# Configure bucket versioning
resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.cdk_style_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

output "bucket_name" {
  value = aws_s3_bucket.cdk_style_bucket.bucket
  description = "Name of the S3 bucket created by Terraform (CDK alternative)"
}

output "bucket_arn" {
  value = aws_s3_bucket.cdk_style_bucket.arn
}

# Commands to run:
# terraform init
# terraform plan
# terraform apply`,
    description:
      "AWS CDK TypeScript code to create S3 bucket with versioning, plus Terraform alternative implementation.",
  },
}

const tasks = {
  task1: {
    title: "Task 1: Terraform Installation & Basic EC2",
    description: "Download Terraform, install, and launch a basic EC2 instance",
    icon: <Terminal className="w-6 h-6" />,
    color: "bg-purple-500",
    status: "Active",
    content: {
      steps: [
        {
          title: "Step 1: Download Terraform",
          items: [
            "Go to https://developer.hashicorp.com/terraform/downloads",
            "Download the Windows AMD64 zip file",
            "Extract the zip file to a folder (e.g., C:\\terraform)",
          ],
        },
        {
          title: "Step 2: Add to PATH Environment Variable",
          items: [
            "Press Windows + R, type sysdm.cpl, press Enter",
            'Click "Environment Variables"',
            'Under "System Variables", find and select "Path"',
            'Click "Edit" → "New"',
            "Add the path where you extracted Terraform (e.g., C:\\terraform)",
            'Click "OK" on all dialogs',
          ],
        },
        {
          title: "Step 3: Verify Installation",
          items: ["Open Command Prompt or PowerShell", "Run: terraform --version"],
        },
      ],
      terraformCode: `provider "aws" {
  region = "us-east-1"
  access_key = "A........."
  secret_key = "GUQEbu+ph6yTkveWObP1JwH1HPz3nbNL7fQ1ygPY"
}

resource "aws_instance" "first-server" {
  ami           = "ami-05ffe3c48a9991133"
  instance_type = "t2.micro"
  
  tags = {
    Name = "amazon_linux"
  }
}`,
      commands: ["terraform init", "terraform validate", "terraform plan", "terraform apply", "terraform destroy"],
    },
  },
  task2: {
    title: "Task 2: Secure Ubuntu EC2 with SSH & HTTPS",
    description: "Launch secure Ubuntu EC2 instance with proper security groups",
    icon: <Shield className="w-6 h-6" />,
    color: "bg-green-500",
    status: "Active",
    content: {
      description:
        "Launch a secure Ubuntu EC2 instance in AWS with SSH and HTTPS access using the default VPC and latest official Ubuntu AMI.",
      terraformCode: `provider "aws" {
  region = "us-east-1"
  access_key = "A............"
  secret_key = "g....................."
}

data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
  owners = ["099720109477"]
}

resource "aws_instance" "Sample_demo" {
  count                  = 1
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t2.micro"
  key_name              = var.key_name
  vpc_security_group_ids = [aws_security_group.allow_tls.id]
  associate_public_ip_address = true
  
  tags = {
    Name = "EC2_Without_AMI"
  }
}

# Use the default VPC
data "aws_vpc" "default" {
  default = true
}

resource "aws_security_group" "allow_tls" {
  name        = "allow_tls"
  description = "Allow TLS inbound traffic and all outbound traffic"
  vpc_id      = data.aws_vpc.default.id
  
  tags = {
    Name = "allow_tls"
  }
}

# Ingress Rule for IPv4 - HTTPS traffic within the VPC
resource "aws_vpc_security_group_ingress_rule" "allow_tls_ipv4" {
  security_group_id = aws_security_group.allow_tls.id
  cidr_ipv4         = data.aws_vpc.default.cidr_block
  from_port         = 443
  ip_protocol       = "tcp"
  to_port           = 443
}

# Ingress Rule for SSH Access (Port 22)
resource "aws_vpc_security_group_ingress_rule" "allow_ssh_ipv4" {
  security_group_id = aws_security_group.allow_tls.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

# Egress Rule - Allow all outbound IPv4 traffic
resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv4" {
  security_group_id = aws_security_group.allow_tls.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}

# Variable for Key Pair
variable "key_name" {
  description = "Name of the AWS key pair for SSH access"
  type        = string
  default     = "terraframe_key2"
}`,
      features: [
        "Latest Ubuntu 22.04 LTS AMI",
        "SSH access on port 22",
        "HTTPS access on port 443",
        "Default VPC usage",
        "Security group with proper ingress/egress rules",
        "Public IP assignment",
        "Key pair authentication",
      ],
    },
  },
  task3: {
    title: "Task 3: Cloud Infrastructure Showcase",
    description: "Multi-service AWS infrastructure with Terraform configurations",
    icon: <Cloud className="w-6 h-6" />,
    color: "bg-red-500",
    status: "Active",
    content: {
      objective:
        "Create basic infrastructure resources in AWS across multiple services and take screenshots as proof of completion for each service.",
      tools: ["Terraform", "AWS Console"],
      services: [
        {
          service: "Amazon EC2",
          task: "Launch a t2.micro instance with Amazon Linux 2",
          icon: "🖥️",
        },
        {
          service: "Amazon VPC",
          task: "Create a custom VPC with 1 public subnet and Internet Gateway",
          icon: "🌐",
        },
        {
          service: "AWS Lambda",
          task: "Create a simple Lambda function (e.g., Hello World in Python)",
          icon: "⚡",
        },
        {
          service: "Amazon S3",
          task: "Create a private bucket with versioning enabled",
          icon: "🪣",
        },
        {
          service: "Amazon EBS",
          task: "Attach a 10GB EBS volume to your EC2 instance",
          icon: "💾",
        },
        {
          service: "Amazon RDS",
          task: "Launch a db.t3.micro RDS instance (e.g., MySQL)",
          icon: "🗄️",
        },
        {
          service: "Amazon Athena",
          task: "Create a database and table from sample S3 data",
          icon: "📊",
        },
        {
          service: "Amazon CloudWatch",
          task: "Create an alarm for EC2 CPU utilization > 70%",
          icon: "📈",
        },
        {
          service: "AWS CloudTrail",
          task: "Enable CloudTrail to monitor API activity",
          icon: "👁️",
        },
        {
          service: "AWS CloudFormation",
          task: "Deploy a basic template to create an EC2 instance",
          icon: "📋",
        },
        {
          service: "AWS CDK",
          task: "Use CDK to provision an S3 bucket (TypeScript or Python)",
          icon: "🔧",
        },
      ],
    },
  },
  task4: {
    title: "Task 4: Terraform Activities",
    description: "Infrastructure as Code with Terraform deployment",
    icon: <Terminal className="w-6 h-6" />,
    color: "bg-blue-500",
    status: "Active",
  },
  task5: {
    title: "Task 5: AWS Cost Management & Billing Calculator",
    description: "AWS cost analysis, billing calculator, and expense tracking",
    icon: <FileText className="w-6 h-6" />,
    color: "bg-yellow-500",
    status: "Active",
    content: {
      description:
        "Comprehensive AWS cost management including service pricing, billing calculator, and expense tracking using Google Sheets integration.",
      features: [
        "AWS Service Cost Calculator",
        "Monthly/Yearly Cost Projections",
        "Service-wise Cost Breakdown",
        "Google Sheets Integration",
        "Real-time Cost Tracking",
        "Budget Planning Tools",
      ],
    },
  },
}

export default function TerraformPortfolio() {
  const [currentTask, setCurrentTask] = useState<"task1" | "task2" | "task3" | "task4" | "task5">("task4")
  const [currentActivity, setCurrentActivity] = useState<"activity1" | "activity2">("activity1")
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [currency, setCurrency] = useState<"USD" | "INR">("USD")

  // Currency conversion function (approximate rate)
  const convertCurrency = (usdAmount: number): string => {
    if (currency === "USD") {
      return `$${usdAmount.toFixed(2)}`
    } else {
      const inrAmount = usdAmount * 83.5 // Approximate USD to INR rate
      return `₹${inrAmount.toFixed(2)}`
    }
  }

  const getCurrencySymbol = () => (currency === "USD" ? "$" : "₹")

  const activity = activities[currentActivity]

  const switchActivity = (activityKey: "activity1" | "activity2") => {
    setCurrentActivity(activityKey)
  }

  const openServiceModal = (serviceName: string) => {
    setSelectedService(serviceName)
  }

  const closeServiceModal = () => {
    setSelectedService(null)
  }

  const renderTaskContent = () => {
    if (currentTask === "task4") {
      return (
        <div className="space-y-6">
          {/* Activity Selector */}
          <div className="flex gap-4 mb-6 justify-center">
            {Object.entries(activities).map(([key, act]) => (
              <Button
                key={key}
                onClick={() => switchActivity(key as "activity1" | "activity2")}
                variant={currentActivity === key ? "default" : "outline"}
                className={`flex items-center gap-2 ${currentActivity === key ? act.color : "border-gray-600"}`}
              >
                {act.icon}
                Activity {key.slice(-1)}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Left Column - Code Files */}
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-white font-semibold">Configuration Files</h3>
                  </div>
                </div>
                <Tabs defaultValue="main-tf" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                    <TabsTrigger value="main-tf" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      main.tf
                    </TabsTrigger>
                    {currentActivity === "activity1" && (
                      <TabsTrigger value="index-html" className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        index.html
                      </TabsTrigger>
                    )}
                    {currentActivity === "activity2" && (
                      <TabsTrigger value="info" className="flex items-center gap-2">
                        <Server className="w-4 h-4" />
                        Info
                      </TabsTrigger>
                    )}
                  </TabsList>
                  <TabsContent value="main-tf" className="mt-0">
                    <div className="p-4 bg-black rounded-b-lg">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        <code>{activity.mainTf}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  {currentActivity === "activity1" && (
                    <TabsContent value="index-html" className="mt-0">
                      <div className="p-4 bg-black rounded-b-lg">
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{activity.indexHtml}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  )}
                  {currentActivity === "activity2" && (
                    <TabsContent value="info" className="mt-0">
                      <div className="p-4 bg-black rounded-b-lg">
                        <div className="text-gray-300 space-y-2">
                          <p className="text-cyan-400 font-semibold">EC2 Instance Details:</p>
                          <p>• Instance Type: t2.micro (Free Tier)</p>
                          <p>• AMI: Amazon Linux 2</p>
                          <p>• Region: us-east-1</p>
                          <p>• Security Group: SSH access (port 22)</p>
                          <p>• Installed Software: Python3, Git</p>
                          <p>• Public IP: 52.90.52.109</p>
                        </div>
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </Card>
            </div>

            {/* Right Column - Activity Info and Screenshots */}
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${activity.color}`}>{activity.icon}</div>
                  <Badge variant="secondary">Task 4</Badge>
                </div>
                <h3 className="text-white font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{activity.description}</p>
              </Card>

              <Card className="bg-gray-800 border-gray-700 p-4">
                <h4 className="text-white font-semibold mb-3">Complete Workflow Screenshots</h4>
                <div className="space-y-4">
                  {currentActivity === "activity1" && (
                    <>
                      <div className="space-y-2">
                        <h5 className="text-cyan-400 text-sm font-medium">1. Terraform Initialization</h5>
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-10%20at%2012.17.41%E2%80%AFPM-k1mra2ZSH7Zsp1TSqCJE4eQNbA3pPg.png"
                          alt="Terraform Init - Activity 1"
                          className="w-full rounded border border-gray-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-cyan-400 text-sm font-medium">2. Terraform Plan</h5>
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-10%20at%2012.17.50%E2%80%AFPM-5TKjzFeCKbRrAJ7GTjBNT0ZoJCvLBX.png"
                          alt="Terraform Plan S3"
                          className="w-full rounded border border-gray-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-cyan-400 text-sm font-medium">3. Terraform Apply</h5>
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-10%20at%2012.18.05%E2%80%AFPM-W5A9CyKAXGAcfIWxpvx4soZMXhKQBP.png"
                          alt="Terraform Apply S3"
                          className="w-full rounded border border-gray-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-cyan-400 text-sm font-medium">4. File Upload to S3</h5>
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-10%20at%2012.19.50%E2%80%AFPM-FiamIlxLIVjYwuCT9RIzWPA5EOYaOa.png"
                          alt="S3 File Upload"
                          className="w-full rounded border border-gray-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-cyan-400 text-sm font-medium">5. Final Website Output</h5>
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-10%20at%2012.19.42%E2%80%AFPM-0IIUmhwcXiPuHWYAz8EeDxt1OGvQky.png"
                          alt="ByteWave Solutions Website"
                          className="w-full rounded border border-gray-600"
                        />
                      </div>
                    </>
                  )}

                  {currentActivity === "activity2" && (
                    <>
                      <div className="space-y-2">
                        <h5 className="text-orange-400 text-sm font-medium">1. Terraform Apply - EC2 Creation</h5>
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-10%20at%2012.22.48%E2%80%AFPM-nZBAmBQPM4gm44uFbOeibbxZg4H5vO.png"
                          alt="Terraform Apply EC2"
                          className="w-full rounded border border-gray-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-orange-400 text-sm font-medium">2. SSH Connection Setup</h5>
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-10%20at%2012.23.47%E2%80%AFPM-4m2cwrY3pBBYlnjyy3LaQs12RDZlLJ.png"
                          alt="SSH Connection"
                          className="w-full rounded border border-gray-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-orange-400 text-sm font-medium">3. AWS Console - Running Instances</h5>
                        <img
                          src="/images/aws-console.png"
                          alt="AWS EC2 Console"
                          className="w-full rounded border border-gray-600"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm font-medium">Deployment Status: Success</span>
                  </div>
                  <div className="text-gray-300 text-xs space-y-1">
                    {currentActivity === "activity1" && (
                      <>
                        <p>✅ S3 Bucket: bytewave-website-as</p>
                        <p>✅ Static Website Hosting: Enabled</p>
                        <p>✅ Public Access: Configured</p>
                        <p>✅ Website URL: bytewave-website-as.s3-website-us-east-1.amazonaws.com</p>
                      </>
                    )}
                    {currentActivity === "activity2" && (
                      <>
                        <p>✅ EC2 Instance: i-0ea7e312288eb419d</p>
                        <p>✅ Instance Type: t2.micro</p>
                        <p>✅ Public IP: 52.90.52.109</p>
                        <p>✅ SSH Access: Configured</p>
                        <p>✅ Python3 & Git: Installed</p>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )
    } else if (currentTask === "task1") {
      const task = tasks[currentTask]
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Installation Steps */}
            <div className="space-y-4">
              {task.content.steps.map((step, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 p-4">
                  <h3 className="text-purple-400 font-semibold mb-3">{step.title}</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    {step.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            {/* Terraform Configuration */}
            <div className="space-y-4">
              <Card className="bg-gray-800 border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Code className="w-5 h-5 text-purple-400" />
                    main.tf Configuration
                  </h3>
                </div>
                <div className="p-4 bg-black">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{task.content.terraformCode}</code>
                  </pre>
                </div>
              </Card>

              <Card className="bg-gray-800 border-gray-700 p-4">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  Terminal Commands
                </h3>
                <div className="space-y-2">
                  {task.content.commands.map((command, index) => (
                    <div key={index} className="bg-black p-2 rounded font-mono text-sm">
                      <span className="text-purple-400">$ </span>
                      <span className="text-gray-300">{command}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      )
    } else if (currentTask === "task2") {
      const task = tasks[currentTask]
      return (
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 p-4">
            <p className="text-gray-300 text-sm">{task.content.description}</p>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Terraform Configuration */}
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Code className="w-5 h-5 text-green-400" />
                  Complete main.tf Configuration
                </h3>
              </div>
              <div className="p-4 bg-black">
                <pre className="text-sm text-gray-300 overflow-x-auto max-h-96">
                  <code>{task.content.terraformCode}</code>
                </pre>
              </div>
            </Card>

            {/* Features */}
            <Card className="bg-gray-800 border-gray-700 p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Security Features
              </h3>
              <ul className="text-gray-300 text-sm space-y-2">
                {task.content.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )
    } else if (currentTask === "task3") {
      const task = tasks[currentTask]
      return (
        <div className="space-y-6">
          {/* Objective */}
          <Card className="bg-gray-800 border-gray-700 p-4">
            <h3 className="text-white font-semibold mb-2">Objective</h3>
            <p className="text-gray-300 text-sm mb-4">{task.content.objective}</p>

            <div className="flex flex-wrap gap-2">
              <span className="text-gray-400 text-sm">Tools Used:</span>
              {task.content.tools.map((tool, index) => (
                <Badge key={index} variant="outline" className="text-red-400 border-red-400">
                  {tool}
                </Badge>
              ))}
            </div>
          </Card>

          {/* AWS Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {task.content.services.map((service, index) => (
              <Card
                key={index}
                className="bg-gray-800 border-gray-700 p-4 hover:border-red-400 transition-colors cursor-pointer"
                onClick={() => openServiceModal(service.service)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{service.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm mb-1">{service.service}</h4>
                    <p className="text-gray-300 text-xs">{service.task}</p>
                    <p className="text-red-400 text-xs mt-2">Click to view Terraform code →</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Requirements */}
          <Card className="bg-gray-800 border-gray-700 p-4">
            <h3 className="text-white font-semibold mb-3">Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <h4 className="text-red-400 font-medium mb-2">Part 1: AWS Infrastructure</h4>
                <ul className="space-y-1">
                  <li>• Use Free Tier resources only</li>
                  <li>• Create simplest working setup</li>
                  <li>• Use AWS Console or Terraform</li>
                  <li>• Take screenshots of each service</li>
                </ul>
              </div>
              <div>
                <h4 className="text-red-400 font-medium mb-2">Part 2: Documentation</h4>
                <ul className="space-y-1">
                  <li>• Take screenshots of each service</li>
                  <li>• Document configuration steps</li>
                  <li>• Verify all resources are working</li>
                  <li>• Clean up resources after testing</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )
    } else if (currentTask === "task5") {
      const task = tasks[currentTask]
      return (
        <div className="space-y-6">
          {/* AWS Cost Calculator Header */}
          <Card className="bg-gray-800 border-gray-700 p-4">
            <h3 className="text-white font-semibold mb-2">AWS Cost Management Dashboard</h3>
            <p className="text-gray-300 text-sm mb-4">{task.content.description}</p>

            <div className="flex flex-wrap gap-2">
              <span className="text-gray-400 text-sm">Features:</span>
              {task.content.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-yellow-400 border-yellow-400">
                  {feature}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Currency Toggle */}
          <Card className="bg-gray-800 border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-400" />
                Currency Settings
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-gray-300 text-sm">Display Currency:</span>
                <Button
                  onClick={() => setCurrency(currency === "USD" ? "INR" : "USD")}
                  variant={currency === "USD" ? "default" : "outline"}
                  size="sm"
                  className={`${currency === "USD" ? "bg-blue-500" : "border-blue-500 text-blue-400"}`}
                >
                  USD ($)
                </Button>
                <Button
                  onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
                  variant={currency === "INR" ? "default" : "outline"}
                  size="sm"
                  className={`${currency === "INR" ? "bg-green-500" : "border-green-500 text-green-400"}`}
                >
                  INR (₹)
                </Button>
              </div>
            </div>
            {currency === "INR" && (
              <div className="mt-2 p-2 bg-gray-900 rounded text-sm text-gray-300">
                <span className="text-yellow-400">💡 Note:</span> Conversion rate: 1 USD = ₹83.50 (approximate)
              </div>
            )}
          </Card>

          {/* Cost Calculator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AWS Service Cost Calculator */}
            <Card className="bg-gray-800 border-gray-700 p-4">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-400" />
                AWS Service Cost Calculator
              </h4>

              <div className="space-y-4">
                {/* EC2 Calculator */}
                <div className="bg-gray-900 p-3 rounded-lg">
                  <h5 className="text-cyan-400 font-medium mb-2">Amazon EC2</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">t2.micro (Free Tier):</span>
                      <span className="text-green-400 ml-2">{convertCurrency(0)}/month</span>
                    </div>
                    <div>
                      <span className="text-gray-400">t2.small:</span>
                      <span className="text-yellow-400 ml-2">{convertCurrency(16.79)}/month</span>
                    </div>
                    <div>
                      <span className="text-gray-400">t3.medium:</span>
                      <span className="text-yellow-400 ml-2">{convertCurrency(30.37)}/month</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Storage (EBS):</span>
                      <span className="text-yellow-400 ml-2">{convertCurrency(0.1)}/GB/month</span>
                    </div>
                  </div>
                </div>

                {/* S3 Calculator */}
                <div className="bg-gray-900 p-3 rounded-lg">
                  <h5 className="text-blue-400 font-medium mb-2">Amazon S3</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Standard Storage:</span>
                      <span className="text-yellow-400 ml-2">{convertCurrency(0.023)}/GB/month</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Requests (PUT):</span>
                      <span className="text-yellow-400 ml-2">{convertCurrency(0.0005)}/1000</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Data Transfer:</span>
                      <span className="text-yellow-400 ml-2">{convertCurrency(0.09)}/GB</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Free Tier:</span>
                      <span className="text-green-400 ml-2">5GB/month</span>
                    </div>
                  </div>
                </div>

                {/* RDS Calculator */}
                <div className="bg-gray-900 p-3 rounded-lg">
                  <h5 className="text-orange-400 font-medium mb-2">Amazon RDS</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">db.t3.micro:</span>
                      <span className="text-yellow-400 ml-2">{convertCurrency(12.41)}/month</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Storage (GP2):</span>
                      <span className="text-yellow-400 ml-2">{convertCurrency(0.115)}/GB/month</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Backup Storage:</span>
                      <span className="text-yellow-400 ml-2">{convertCurrency(0.095)}/GB/month</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Free Tier:</span>
                      <span className="text-green-400 ml-2">750 hours/month</span>
                    </div>
                  </div>
                </div>

                {/* Lambda Calculator */}
                <div className="bg-gray-900 p-3 rounded-lg">
                  <h5 className="text-purple-400 font-medium mb-2">AWS Lambda</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Requests:</span>
                      <span className="text-yellow-400 ml-2">{convertCurrency(0.2)}/1M requests</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Duration (GB-sec):</span>
                      <span className="text-yellow-400 ml-2">{convertCurrency(0.0000166667)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Free Tier:</span>
                      <span className="text-green-400 ml-2">1M requests/month</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Free Duration:</span>
                      <span className="text-green-400 ml-2">400,000 GB-sec</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Monthly Cost Summary */}
            <Card className="bg-gray-800 border-gray-700 p-4">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-400" />
                Monthly Cost Estimation
              </h4>

              <div className="space-y-4">
                {/* Current Infrastructure Costs */}
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h5 className="text-yellow-400 font-medium mb-3">Current Infrastructure (Free Tier)</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">EC2 t2.micro (1 instance)</span>
                      <span className="text-green-400">{convertCurrency(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">S3 Storage (5GB)</span>
                      <span className="text-green-400">{convertCurrency(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">RDS db.t3.micro (750 hrs)</span>
                      <span className="text-green-400">{convertCurrency(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Lambda (1M requests)</span>
                      <span className="text-green-400">{convertCurrency(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">EBS Storage (30GB)</span>
                      <span className="text-yellow-400">{convertCurrency(3.0)}</span>
                    </div>
                    <hr className="border-gray-600" />
                    <div className="flex justify-between font-semibold">
                      <span className="text-white">Total Monthly Cost:</span>
                      <span className="text-green-400">{convertCurrency(3.0)}</span>
                    </div>
                  </div>
                </div>

                {/* Production Scale Estimate */}
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h5 className="text-red-400 font-medium mb-3">Production Scale Estimate</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">EC2 t3.medium (3 instances)</span>
                      <span className="text-yellow-400">{convertCurrency(91.11)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">S3 Storage (100GB)</span>
                      <span className="text-yellow-400">{convertCurrency(2.3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">RDS db.t3.small</span>
                      <span className="text-yellow-400">{convertCurrency(24.82)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Lambda (10M requests)</span>
                      <span className="text-yellow-400">{convertCurrency(2.0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Load Balancer</span>
                      <span className="text-yellow-400">{convertCurrency(16.2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">CloudWatch</span>
                      <span className="text-yellow-400">{convertCurrency(10.0)}</span>
                    </div>
                    <hr className="border-gray-600" />
                    <div className="flex justify-between font-semibold">
                      <span className="text-white">Total Monthly Cost:</span>
                      <span className="text-red-400">{convertCurrency(146.43)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Annual Cost:</span>
                      <span className="text-red-400">{convertCurrency(1757.16)}</span>
                    </div>
                  </div>
                </div>

                {/* Cost Optimization Tips */}
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h5 className="text-green-400 font-medium mb-3">💡 Cost Optimization Tips</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Use Reserved Instances for 40-60% savings</li>
                    <li>• Enable S3 Intelligent Tiering</li>
                    <li>• Set up CloudWatch billing alerts</li>
                    <li>• Use Spot Instances for non-critical workloads</li>
                    <li>• Implement auto-scaling policies</li>
                    <li>• Regular resource cleanup and monitoring</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Google Sheets Integration */}
          <Card className="bg-gray-800 border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-400" />
                AWS Cost Tracking Spreadsheet
              </h4>
              <a
                href="https://docs.google.com/spreadsheets/d/1lyWHARq9W4O51jkUlqgj3dkdY4nDChFsBX9cIpHw7Bw/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 text-sm underline"
              >
                Open in Google Sheets →
              </a>
            </div>

            <div className="bg-white rounded-lg overflow-hidden" style={{ height: "600px" }}>
              <iframe
                src="https://docs.google.com/spreadsheets/d/1lyWHARq9W4O51jkUlqgj3dkdY4nDChFsBX9cIpHw7Bw/edit?usp=sharing&output=embed"
                width="100%"
                height="100%"
                frameBorder="0"
                title="AWS Cost Tracking Spreadsheet"
                className="rounded-lg"
              />
            </div>

            <div className="mt-4 p-3 bg-gray-900 rounded-lg">
              <h5 className="text-yellow-400 font-medium mb-2">📊 Spreadsheet Features</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <ul className="space-y-1">
                  <li>• Service-wise cost breakdown</li>
                  <li>• Monthly budget tracking</li>
                  <li>• Cost trend analysis</li>
                  <li>• Resource utilization metrics</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Automated cost calculations</li>
                  <li>• Budget alerts and warnings</li>
                  <li>• Historical cost data</li>
                  <li>• ROI analysis tools</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* AWS Billing Best Practices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700 p-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-yellow-400" />
                Billing Best Practices
              </h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">✅</span>
                  <span>Enable detailed billing reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">✅</span>
                  <span>Set up billing alerts and budgets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">✅</span>
                  <span>Use AWS Cost Explorer regularly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">✅</span>
                  <span>Tag resources for cost allocation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">✅</span>
                  <span>Review and optimize monthly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">✅</span>
                  <span>Use AWS Trusted Advisor</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-gray-800 border-gray-700 p-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-400" />
                Free Tier Monitoring
              </h4>
              <div className="space-y-3">
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm">EC2 Hours Used</span>
                    <span className="text-green-400 text-sm">245/750</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: "33%" }}></div>
                  </div>
                </div>

                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm">S3 Storage Used</span>
                    <span className="text-green-400 text-sm">2.1GB/5GB</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>

                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm">Lambda Requests</span>
                    <span className="text-yellow-400 text-sm">850K/1M</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )
    } else {
      // Fallback for any other tasks
      const task = tasks[currentTask]
      return (
        <div className="flex flex-col items-center justify-center min-h-96 space-y-6">
          <div className={`p-8 rounded-full ${task.color}`}>{task.icon}</div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">{task.title}</h2>
            <p className="text-gray-300">{task.description}</p>
            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
              {task.status}
            </Badge>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cpu className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Infrastructure Portfolio</h1>
            <Cloud className="w-8 h-8 text-blue-400" />
          </div>
          <div className="space-y-2">
            <p className="text-gray-300 text-lg">Complete Infrastructure Learning Journey</p>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                Student: Arvind Singh Chouhan
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400">
                Infrastructure Specialist
              </Badge>
            </div>
          </div>
        </div>

        {/* Task Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(tasks).map(([key, task]) => (
            <Button
              key={key}
              onClick={() => setCurrentTask(key as "task1" | "task2" | "task3" | "task4" | "task5")}
              variant={currentTask === key ? "default" : "outline"}
              className={`flex flex-col items-center gap-2 h-20 ${
                currentTask === key ? task.color : "border-gray-600"
              }`}
            >
              {task.icon}
              <span className="text-sm font-medium">{task.title.split(":")[0]}</span>
              {task.status === "Active" && (
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Current Task Header */}
        <Card className="bg-gray-800 border-gray-700 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${tasks[currentTask].color}`}>{tasks[currentTask].icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-white">{tasks[currentTask].title}</h2>
              <p className="text-gray-300">{tasks[currentTask].description}</p>
            </div>
            <div className="ml-auto">
              <Badge
                variant={tasks[currentTask].status === "Active" ? "default" : "outline"}
                className={
                  tasks[currentTask].status === "Active" ? "bg-green-500" : "text-yellow-400 border-yellow-400"
                }
              >
                {tasks[currentTask].status}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Task Content */}
        {renderTaskContent()}

        {/* Service Code Modal */}
        {selectedService && awsServiceConfigs[selectedService] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="bg-gray-800 border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-red-400" />
                  <h3 className="text-white font-semibold">{selectedService} - Terraform Configuration</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeServiceModal}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[70vh]">
                <div className="mb-4">
                  <p className="text-gray-300 text-sm">{awsServiceConfigs[selectedService].description}</p>
                </div>
                <div className="bg-black p-4 rounded-lg">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{awsServiceConfigs[selectedService].code}</code>
                  </pre>
                </div>
                <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Commands to run:</h4>
                  <div className="space-y-1">
                    <div className="bg-black p-2 rounded font-mono text-sm">
                      <span className="text-red-400">$ </span>
                      <span className="text-gray-300">terraform init</span>
                    </div>
                    <div className="bg-black p-2 rounded font-mono text-sm">
                      <span className="text-red-400">$ </span>
                      <span className="text-gray-300">terraform plan</span>
                    </div>
                    <div className="bg-black p-2 rounded font-mono text-sm">
                      <span className="text-red-400">$ </span>
                      <span className="text-gray-300">terraform apply</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 bg-gray-800 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-gray-300 text-sm">Portfolio Active</span>
            <div className="text-gray-400 text-sm">
              {currentTask.toUpperCase()} |{" "}
              {currentTask === "task4" ? `Activity ${currentActivity.slice(-1)}` : "Overview"}
            </div>
          </div>
          <div className="text-gray-400 text-sm">Arvind Singh Chouhan | Infrastructure Learning Portfolio</div>
        </div>
      </div>
    </div>
  )
}
