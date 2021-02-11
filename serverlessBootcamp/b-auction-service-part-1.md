---
title: 'Auction Service: Part 1'
part: 1
date: '2021-02-10'
categories: [backend]
tags: [aws]
source: [udemy]
---

# Auction Service: Part 1

## Anatomy of a Serverless Project

In your `serverless.yml` file, we have important sections:

- `service`: where you define metadata about your service
  - `name` gets used in the deployment names
- `plugins`: serverless plugins that you want to use
- `provider`: where you give information about your cloud provider
  - `name` sets provider
  - `runtime` sets environment being run inside AWS lambda function
  - `memorySize` globally sets amount of memory allocated for AWS lambda function
    - Can be set separately per function
    - Helps optimize costs
  - `stage` defines whether you're on dev, staging, qa, production, etc.
  - `region` sets the zone where you will deploy to the cloud
- `functions`: where we define functions used by deployment. In each function config, we have the following...
  - `handler` is the actual code that will be executed when function is run
  - `events` defines the events that _trigger_ the function
    - These can be `http`, `sqs`, `schedule`, etc.

```yaml
service:
  name: auctionService

plugins:
  - serverless-bundle
  - serverless-pseudo-parameters

provider:
  name: aws
  runtime: nodejs12.x
  memorySize: 256
  stage: ${opt:stage, 'dev'}

functions:
  hello:
    handler: src/handlers/hello.handler
    events:
      - http:
          method: GET
          path: /hello
```

**Note about variables**: The `stage` property uses a Serverless **variable** using the syntax by `${variable, fallback}`. In the example above, we access the `opt:stage` variable, which is a variable you can create when setting custom options. Then if that variable is undefined, we provide a fallback: `'dev'`.

**Note about handler syntax**: The `handler` property accesses a **named variable** called `handler` in the `hello.js` file. (This structure will make sense when we implement middleware.)

### `custom` section

The `custom` section in your `serverless.yml` is the place where you can define your _own_ variables that aren't part of the _core_ Serverless framework. For example, it's commonly used to configure your plugins.

```yaml
custom:
  # tells serverless-bundle plugin not to perform linting check
  bundle:
    linting: false
```

## Deploying Application using Serverless

To deploy, just make sure your IAM user information has been configured (multiple ways to do that), and then run `serverless deploy -v`.

**Note**: It's fun to add the `-v` flag to see exactly what Serverless is doing.

### Viewing results in AWS

1. In AWS, set your region to one that was set in your `serverless.yml`.
2. Go to CloudFormation service and select "Stacks".
3. Inside, you'll find your **stack**! (A stack is a grouping of your applications and the resources they need.)
4. Inside your stack, you have access to "Events". This tells you what happened during deployment.
5. You also have "Resources". It tells you all the resources configured.

**Notable resource**:

- `ServerlessDeploymentBucket` is where the files containing the code for your lambda functions can be found.
- `LogGroup` is a CloudWatch log group that allows you to see log streams of executions.
- `IamRoleLambdaExecution` sets the policies for the lambda function (what it can and can't do).
- `LambdaFunction` is the function itself. You can view the contents of the function's code here.
- `ApiGatewayRestApi` is where we expose our functions to the internet through endpoints.

## Stack Removal

To remove a stack, just type `sls remove -v` while in your application root directory.

## Creating Our First Lambda Function

We want to build a `/createAuctions` API Gateway endpoint that triggers a lambda function.

### Configuring `serverless.yml`

In `serverless.yml`, we write:

```yaml
functions:
  createAuction:
    handler: src/handlers/createAuction.handler
    events:
      - http:
        method: POST
        path: /auction
```

### Understanding the `event`, `context`, and response objects in a lambda function

Then in `src/handlers/createAuction.js`, we have our lambda function:

```js
async function createAuction(
  // Contains info about the event that triggered execution
  // Includes: event body, query params, path params, request header, etc.
  event,
  // Contains metadata about execution of function
  context
) {
  // This is the response object
  return {
    statusCode: 200,
    body: JSON.stringify({ content: 'converts to JSON' }),
  };
}

export const handler = createAuction;
```

**Pro tip**: You can add custom data to both `event` and `context` via **middleware**. For example, if the lambda function requires a `userId`, you could add it via middleware. (We'll do this later.)

**Note**: If you only changed the lambda function code itself, you could just re-deploy the lambda function alone. In our case, we have to run `sls deploy` because our changes to the `serverless.yml` file affect API Gateway and other services as well.

### Writing the lambda function code

The following code just creates an `auction` object and returns it. We will write it to a database next.

```js
async function createAuction(event, context) {
  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
  };

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}
```

With this change, it's purely lambda function code, so we can redeploy with the command `sls deploy -f createAuction`. (Behind the scenes, Serverless just re-deploys the handler file in `serverless.yml`.)

## What is DynamoDB?

**DynamoDB** is a fully managed, serverless, noSQL database provided by AWS.

It's _fully managed_ in that it automatically spreads your data and traffic across a sufficient number of servers.

The major parts of the data in a DynamoDB database are:

- Tables (like collections)
- Items (like documents)
- Attributes (like properties)

### Query vs. scan

The **scan** operation scans through an entire table. The **query** operation allows you to search via a primary key or secondary index.

Between the two, querying is more efficient. Scanning is a last resort.

### Primary key

DynamoDB is schema-less except for the **primary key** in a table. This must be specified when you create a table, and it guarantees a unique identifier.

Types of primary keys:

- Partition key (e.g. id)
- Composite primary key: partition + sort key (e.g. id + createdAt)

### Secondary index

**Secondary indices** allow for greater flexibility in your queries.

2 types of secondary indices:

- Global secondary index: partition + sort key
  - You can create up to 20 of these per table
- Local secondary index: partition + extra sort key

### Read consistency

**Read consistency** has to do with how accurate the data is at the point of read.

There are a few types of read consistency:

- **Eventually consistent reads**: the response doesn't necessarily reflect the results of a recently completed write operation. (This is a result of the fact that DynamoDB spreads your data across zones for better durability and high availability.)
  - _IE_: If you just wrote and item to the database and then wanted to read it, you might not get that item back.
- **Strongly consistent reads**: Guarantee that you'll get the most up-to-date reads
  - Might not be available during network delay or outage
  - Potential higher latency
  - Not supported on global secondary indices
  - More throughput capacity (i.e. more costs)

**Pro tip**: The type of read you perform should depend on use case. Unless you need to present your user with data you _just_ wrote, you probably want to go with an eventually consistent read.

### Read/write capacity modes

There are 2 modes used during reads/writes:

- **On-demand mode**: good for tables where you can't predict the workload you expect

  - Flexible
  - Can serve 1000s of requests per second
  - Pay per request
  - No need to plan capacity ahead of time
  - Adapts to workload
  - Delivery time is single-digit ms latency (SLA)

- **Provisioned mode**: good for when you _can_ predict the workload
  - Read/write capacity per second must be specified
  - Can specify auto-scaling rules
  - Can reserve capacity in advance, which can reduce costs
  - Capacity measured as Read Capacity Units (RCU) and Write Capacity Units (WCU)

Definitions of RCU and WCU:

- **RCU**:
  - 1 strongly consistent read per second, or
  - 2 eventually consistent reads per second
  - Maximum 4KB in size
- **WCU**:
  - 1 write per second
  - Maximum 1KB in size

**Note**: If you go over size limit, that's not bad. It just means your read/write operation will use more than 1 RCU or 1 WCU.

### DynamoDB streams

This is an optional feature that allows you to react to events **on creation, update, or deletion**.

**Example**: When a user gets added to the `UsersTable`, you can trigger a lambda function that sends them a welcome email.

## Adding DynamoDB as a Resource

Since we're practicing IaaS, we create our DynamoDB database in the `serverless.yml` file.

This goes under the `resources` section and uses **CloudFormation syntax** (language created by AWS to define resources):

```yaml
resources:
  # AWS resources
  Resources:
    # Logical ID
    AuctionsTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: AuctionsTable
        # Provisioned mode
        BillingMode: PAY_PER_REQUEST
        # Setting primary key
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S # string
        # Setting partition key
        KeySchema:
          - AttributeName: id
            KeyType: HASH
```

**Note**: You need to set `AttributeDefinitions` and `KeySchema` together, or else it won't work. Not sure why.

## Inserting Items into a DynamoDB Table

To add items, we need a few things set up:

1. A way to generate a unique `id` property
2. Access to DynamoDB

### Generating a unique `id`

Since we set `id` as our primary key, it's **required**. So in our lambda function, we can use `uuid` to generate a unique value:

```js
import { v4 as uuid } from 'uuid';

async function createAuction(event, context) {
  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
  };

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}
```

### Writing to DynamoDB

AWS provides an SDK package called `aws-sdk`. It allows you to interact with tons of AWS services in your lambda functions.

```js
import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
  };

  await dynamoDb.put({ TableName: 'AuctionsTable', Item: auction }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}
```

**Pro tips**:

- It's safe to place your `dynamoDb` client in the outer scope because it's relatively **constant**.
  - In contrast, you should never place variables in the outer scope that are dynamic.
  - That's because lambda functions can turn off when not used, destroying memory of those variables.
- Every method available in `aws-sdk` uses the callback pattern by default. You can append `.promise()` if you want to use the promise pattern instead.

**UH OH**: If you invoke this lambda function, it will give you an `AccessDeniedException`. That's because our lambda function doesn't have write permissions.

### Adding IAM role statements (permissions)

When you create a lambda function, it receives an **IAM role** that defines the access given to the function. By default, Serverless framework only gives us write access to CloudWatch (for logging).

To add DynamoDB, we add a `iamRoleStatements` property to our `serverless.yml` (either globally under `provider` or specifically in your lambda function):

```yaml
plugins:
  - serverless-pseudo-parameters

provider:
  name: aws
  iamRoleStatements:
    # Grants PUT write access to AuctionsTable in DynamoDB
    - Effect: Allow
      Action:
        - dynamodb:PutItem
      Resource:
        - arn:aws:dynamodb:#{AWS::Region}:#{AWS::AccountId}:table/AuctionsTable
```

**Note about `Resource`**:

- You input your Amazon Resource Name (ARN) here. It's a unique identifier for your specific resource.
- Notice `#{AWS::Region}` and `#{AWS::AccountId}`? These are **pseudo-parameters** provided by the `serverless-pseudo-parameters` plugin.
- By making our ARN dynamic, we have _flexibility_ around what region or AWS account we want to deploy our application in.

After re-deploying, now the `createAuction` lambda function should work!

## Cleanup: Optimizing `serverless.yml`

As it stands, _everything_ lives in our `serverless.yml`. But what if we keep adding more and more `iamRoleStatements` or `resources`? Our file could get huge.

How can we separate out the file and make everything more readable?

### The `file` function

YAML is a _superset_ of JSON. That means it's just a grouping of objects and their properties.

We can therefore take snippets of YAML and place it in its own file.

```yaml
# PUT write access to AuctionsTable
AuctionsTableIAM:
  Effect: Allow
  Action:
    - dynamodb:PutItem
  Resource:
    - arn:aws:dynamodb:#{AWS::Region}:#{AWS::AccountId}:table/AuctionsTable
```

Then simply reference it using Serverless framework's built-in `file` function:

```yaml
provider:
  name: aws
  iamRoleStatements:
    - ${file(iam/AuctionsTableIAM.yml):AuctionsTableIAM}
```

**Note**: `file` accepts a relative path from your `serverless.yml`. Then you access the object attached to the name `AuctionsTableIAM`.

### Intrinsic functions and custom variables
