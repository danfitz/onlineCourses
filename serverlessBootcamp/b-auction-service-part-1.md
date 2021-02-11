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

## Adding DynamoDB as a Resource
