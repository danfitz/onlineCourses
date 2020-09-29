---
title: 'AWS Fundamentals: IAM & EC2'
part: 1
date: '2020-09-28'
categories: [tools]
tags: [aws]
source: [udemy]
---

# AWS Fundamentals: IAM & EC2

With **IAM**, we will learn how to create users, groups, and policies. Then we will look into **EC2**, one of the most widely used services in AWS.

## AWS Regions and Availability Zones

### AWS regions

**AWS regions** are _clusters of data centers_.

**Important**: Most AWS services are **region-scoped**--meaning whatever services you set up in one region must be separately set up in another region.

- IAM is global
- EC2 is region-scoped

**Pro tip**: Not all services are found in your preferred region. Use this [region table](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/) to find out what services you have access to.

### Availability zones

Every region has multiple **AWS availability zones** (or AZ). These are _discrete data centers_, each with their own power. networking, and connectivity. As a result, each AZ is _separate_ from one another: a disaster in one won't affect the others.

**Note**: Even though each AZ is isolated, they're still connected through high bandwidth, ultra-low latency networking.

## IAM (Identity and Access Management)

IAM is the heart of your **security**. It consists of

- Users
- Groups
- Roles

Unlike every other service, IAM is **global**. Whatever you set up in IAM applies to _every region_, not just the one you're currently on.

The first account you will ever use when setting up AWS is your **root account**. This account has _every privilege_ possible.

**Pro tip**: Only use the root account for _initial setup_. Then never use it again! It has too much control.

**Pro tip**: It's a good idea to give users the _minimal amount of permissions_ required to do their job. This is known as the **least privilege principle**.

### Users, groups, roles, and policies

**Users** map to physical people (of course).

**Groups** are clusters of users that inherit the permissions you apply to those groups; they're usually grouped by functions (e.g. DevOps) or teams (e.g. engineering).

**Roles** are permissions we give to a _machine_. It's internal to usage within AWS resources. (This will probably make more sense later.)

Finally, **policies** apply definitions of what users, groups, and roles _can and cannot do_. They're written in JSON.

**Note**: IAM has _managed policies_, which are like predefined policies to make your life easier.

### IAM Federation

Big enterprises that already have their own user database can set up logins using their company credentials. This is **IAM Federation**.

It uses the SAML standard.

### Random pro tips

- IAM is where you set up multi-factor authentication

### Hands-on walkthrough

When in IAM, there is a checklist to complete.

1. Activate multi-factor authentication on the root account
2. Create an IAM user. This will give you a credentials table where you can save or send their sensitive security information.

   - **Pro tip**: Create a user with AdministratorAccess policy permissions.

3. You can then define groups and assign permissions. It's a good idea to apply those groups to the users you create.
4. You can then set a password policy that even forces a password reset every X days.
5. Finally, you want to log into that admin user you created. **Stop using the root account.**

## EC2

**EC2** was the foundational service that Amazon started with. Nowadays, Amazon's more cutting-edge offerings are serverless, but EC2 is still fundamental to _understanding how the cloud works_.

EC2 basically allows you to **rent virtual machines**. There are sub-services though that go along with it:

- EBS stores data on virtual drives
- ELB provides load balancing across machines
- ASG helps scale your service using an auto-scaling group

### How to launch an EC2 instance
