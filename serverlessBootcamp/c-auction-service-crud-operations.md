---
title: 'Auction Service: CRUD Operations'
part: 3
date: '2021-02-17'
categories: [backend]
tags: [aws]
source: [udemy]
---

# Auction Service: CRUD Operations

## Middleware

**Middleware** are functions that run either _before_ or _after_ your Lambda `handler`.

We will be using `middy`, a middleware engine for AWS Lambda.

```js
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';

const myLambda = (event, context) => {
  /* code here */
};

export const handler = middy(myLambda)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler());
```

### Common middlewares

## GET Request: Scanning

If you recall, **scanning** get items by looking through an entire table, which is inefficient. But it's good to know how to do it using the AWS SDK.

```js
const result = await dynamoDb.scan({ TableName: 'MY_TABLE_NAME' }).promise();
console.log(result.Items); // array of all items in table
```

**Note**: If you're adding a new GET endpoint using `scan`, you'll need to update the Serverless framework in a few places:

- Add a lambda function for the endpoint
- Include the operation type `dynamodb:Scan` in the IAM config

## GET Request: Querying by Key

**Querying** is more efficient as it can make use of primary partition keys when looking for items.

```js
const result = await dynamoDb
  .get({
    TableName: 'MY_TABLE_NAME',
    Key: { id: 'my-id' },
  })
  .promise();
console.log(result.Item);
```

Similarly, you want to update the `serverless.yml`:

- Include a lambda function for the new endpoint
- Include operation type `dynamodb:GetItem` in the IAM config

##
