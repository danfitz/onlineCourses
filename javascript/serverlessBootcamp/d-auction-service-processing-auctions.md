---
title: 'Auction Service: Processing Auctions'
part: 4
date: '2021-02-25'
categories: [backend]
tags: [aws]
source: [udemy]
---

# Auction Service: Processing Auctions

## Creating Scheduled Events

We want to process auctions that have hit their deadline (like an eBay auction).

You can do this by creating a lambda function that triggers on a scheduled event. In your `serverless.yml`, you just add this:

```yaml
processAuctions:
  handler: src/handlers/processAuctions.handler
  events:
    - schedule: rate(1 minute)
```

**Notes**:

- We're using the `rate` expression to set up the scheduling rules. You can also use the `cron` syntax. Amazon explains both [here](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html).
- `schedule` uses AWS EventBridge behind the scenes.

### Viewing logs from terminal

Serverless gives you the `sls log` command to be able to view CloudWatch logs from your terminal.

To view a trailing number of logs for your lambda function:

```
sls logs -f processAuctions -t
```

To view logs from a chunk of the past:

```
sls logs -f processAuctions --startTime 1h
```

### Executing functions manually for testing

Scheduled events are not always great for development. It's therefore better to comment out the `events` part of your lambda function and then trigger the function manually instead.

To trigger a function manually, just type this in the terminal:

```
sls invoke -f processAuctions -l
```

**Note**: `-l` just returns the logs for the function.

## Adding a Global Secondary Index

As of right now, our application can _only_ identify auctions in DynamoDB using the `id` primary partition key.

For `processAuctions`, we want to close auctions that have a `status: 'OPEN'` and an `endingAt` that is in the past.

Therefore, to query these auctions in a performant way, we want to make `status` into a partition key and `endingAt` into a sort key.

### Updating key definitions in `serverless.yml`

To add a global secondary index, we add this under `Properties` in the DynamoDB setup:

```yaml
AttributeDefinitions:
  - AttributeName: id
    AttributeType: S # string
  - AttributeName: status
    AttributeType: S
  - AttributeName: endingAt
    AttributeType: S
KeySchema:
  - AttributeName: id
    KeyType: HASH
GlobalSecondaryIndexes:
  - IndexName: statusAndEndDate
    KeySchema:
      - AttributeName: status
        KeyType: HASH
      - AttributeName: endingAt
        KeyType: RANGE
    Projection:
      ProjectionType: ALL
```

The main thing to note in this config is that we set the global secondary index in `GlobalSecondaryIndexes` and create a custom `IndexName`.

**Things to note**:

- `AttributeDefinitions` declares the attributes that will be used as keys
- `KeySchema` is where we define the primary key
- `HASH` sets the attribute to a partition key (or hash attribute)
- `RANGE` sets the attribute to a sort key (where the database stores items in sorted order)
- `ProjectionType: ALL` projects all attributes into the global secondary index.

**Pro tip**: Behind the scenes, when you create a global secondary index, DynamoDB creates a _virtual copy_ of your table, making it possible to query efficiently based on the global secondary index.

## Querying by Global Secondary Index

### Setup

We now can begin using `Query` to efficiently get auctions that we want to close.

To begin, we need to (1) give query permissions in IAM and (2) add the new table used by the global secondary index `statusAndEndDate`.

```yaml
AuctionsTableIAM:
  Effect: Allow
  Action:
    # ...
    - dynamodb:Query
  Resource:
    - ${self:custom.AuctionsTable.arn}
    # The ARN for a GSI table is usually the main ARN
    # ending with /index/globalSecondaryIndexName
    - !Join [
        '/',
        ['${self:custom.AuctionsTable.arn}', 'index', 'statusAndEndDate'],
      ]
```

### Query syntax

The actual query has a few parts:

```js
const params = {
  TableName: process.env.AUCTIONS_TABLE_NAME,
  IndexName: 'statusAndEndDate',
  KeyConditionExpression: '#status = :status AND endingAt <= :now',
  ExpressionAttributeValues: {
    ':status': 'OPEN',
    ':now': new Date().toISOString(),
  },
  ExpressionAttributeNames: {
    '#status': 'status',
  },
};

const result = await dynamoDb.query(params).promise();
```

**Things to note**:

- `KeyConditionExpression` uses DynamoDB's query syntax
- The variables `:status` and `:now` are set inside `ExpressionAttributeValues`
- `#status` begins with a `#` because `status` is a reserved keyword; we resolve `#status` to mean `status` in `ExpressionAttributeNames`

### Processing auctions by closing them

Now that we have a list of auctions that we want to close, we can flesh out our `processAuctions` handler/lambda.

```js
async function processAuctions(event, context) {
  try {
    const auctionsToClose = await getEndedAuctions();
    const closePromises = auctionsToClose.map(closeAuction);
    await Promise.all(closePromises);
    return { closed: closePromises.length };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}
```

High-level, here's what `processAuctions` is doing:

1. Gets all auctions to close
2. Asynchronously closes each auction.
3. Waits for all closures to resolve.
4. Returns number of closed auctions.
   - Notice that the return object isn't an HTTP response. That's because this lambda isn't triggered by API Gateway.

To flesh out `closeAuction` some more, it just contains an `Update` operation to the DynamoDB table. Specifically, it sets `status` to `'CLOSED'`.

```js
async function closeAuction(auction) {
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id: auction.id },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeValues: {
      ':status': 'CLOSED',
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  };

  return await dynamoDb.update(params).promise();
}
```

## JSON Schema Validation

The course spends some time explaining how to use `@middy/validator` to create schemas that help you error handle missing user inputs for API endpoints.

The [`@middy/validator`](https://middy.js.org/packages/validator/) documentation explains it well enough.
