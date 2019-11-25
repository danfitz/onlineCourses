---
categories: [backend]
tags: [nosql, firebase]
title: "Model Relational Data in Firestore NoSQL"
source: [fireship]
---

## Definitions

**Documents** are like JSON objects.

**Collections** are containers to hold multiple documents *and* nested collections.

**Best practice**: Collections should be large; documents should be small (1MB or smaller).

## 3 Ways of Modeling Data

3 ways to model data:
1. **Root collection**: collection of documents at root of database
2. **Embed data directly into documents**: add strings, booleans, numbers, etc.
3. **Nest sub-collections onto documents**: scopes collections into documents

### Embedding data

If you anticipate that your documents could get very large (due to a large data set), embedding data directly into documents isn't ideal. In this case, you want to opt for a *sub-collection*.

**When to use**: You have a small data structure that doesn't need to scale up to 1000s of records.

### Sub-collections

Because sub-collections are scoped to that specific user, you can't query *across parents*. For example, if each user has a sub-collection containing `address` details, sub-collections don't allow you to make queries like, "give me all users living in Ontario".

In this case, the best solution is to **denormalize** `address` at the root collection and give it the user ID for reference (kind of like a foreign key).

## Creating one-to-many relationship

The pattern of using a foreign key is basically how you create a one-to-many relationship!

## Creating many-to-many relationship

Hearts in Twitter are a great example of many-to-many: users have many hearts, and tweets have many hearts too.

The solution is to create the equivalent of a join table:

1. Create `hearts` collection.
2. In each document, the ID is `userId_tweetId`, creating a unique key for that relationship.
3. Each document has `userId` and `tweetId` as properties.

**Note**: This is very similar to an **intermediate table**, which is used for joins in SQL.

**Best practice**: Because it's expensive to get a heart count by referencing `hearts` directly, you usually will **aggregate data** by adding a heart count to your tweets.