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
sls log -f processAuctions -t
```

To view logs from a chunk of the past:

```
sls log -f processAuctions --startTime 1h
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
