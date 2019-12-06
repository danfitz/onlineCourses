---
title: "MongoDB and Promises"
part: 9
date: "2019-12-05"
categories: [backend]
tags: [nodejs, js]
source: [udemy]
---

# MongoDB and Promises

## Setting up MongoDB

**Note**: These instructions are for Windows only.

1. Download and unzip `.zip` file of MongoDB Community Server. This folder contains all the executables you need to run MongoDB.
2. Create a folder to store your MongoDB data (e.g. `mongodb-data`).
3. Run `mongod.exe --dbpath=path/to/mongodb-data` to start your server. This file is in the `bin` folder.
   * **Note**: You should see the default port `27017`. You can connect to your database server via that port.

**Bonus**: Do the following to set up a MongoDB database GUI viewer:
1. Download Robo 3T.
2. While database server is still running, connect to your server at `localhost:27017`. That's it!

## MongoDB inside Node.js

MongoDB provides a **native driver** npm module to connect to your MongoDB database and perform **CRUD** operations. Simply `npm install mongodb`.

### Connecting to MongoDB

With your database server still up, write the following code to connect to MongoDB in Node.js:

```js
// 1. Get MongoDB API
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

// 2. Set connectionURL
const connectionURL = 'mongodb://127.0.0.1:27071' // default for local databases

// This connect method takes 3 arguments:
// 1. Connection URL of database server
// 2. Options object (good idea to provide a `useNewUrlParser: true` key/value pair for your URL)
// 3. Callback that gets invoked when connection succeeds or fails
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  // Check for error
  if (error) {
    console.log('Failed to connected')
    return
  }

  console.log('Client successfully connected')
  // Get connection to specific database
  // NOTE: This CREATES a database if it can't find a match
  const db = client.db('database name')

  // Create document at a collection
  db.collection('users').insertOne({
    name: 'Dan',
    age: 27
  })
})
```

### Creating documents

This is the **create** in CRUD. The below code snippet demonstrates how to use `insertOne` and `insertMany` methods.

```js
db.collection('users').insertOne({
  name: 'Dan',
  age: 27
}, (error, result) => {
  console.log(result.ops)
})

db.collection('users').insertMany([
  {
    name: 'John',
    age: 27
  }, {
    name: 'Amy',
    age: 21
  }
], (error, result) => {
  console.log(result.ops)
})
```

`insertOne` and `insertMany` both take a callback function that gets invoked upon completion of the write operation. If something went wrong, you get an `error` object. Otherwise, you get a `result` object.

**Pro tip**: `result.ops` is the most useful property in `result`. It provides you with an array of all the documents you just wrote *with* their automatically generated unique IDs.

### Reading documents

The object ID