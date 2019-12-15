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
    console.log('Failed to connect')
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

### Object IDs

Any time you create a document, it's automatically assigned an **object ID** both as a key and a field within the document. These are alphanumeric values meant to be **globally unique identifiers** or **GUIDs**. (In contrast, SQL usually has incrementing IDs for its tables like 1, 2, 3, 4.)

Benefits of GUIDs:
* MongoDB opted for GUIDs because it ensures zero query collision when you spread your database across multiple servers. This allows for smooth scaling.
* Because MongoDB's GUIDs are generated via an algorithm, you can locally generate them *without* needing contact with your database.

Here's the process to create your own object IDs using the `mongodb` Node.js library:

```js
const { ObjectID } = require('mongodb')

const id = new ObjectID() // constructor function!
id.getTimestamp() // returns timestamp embedded *inside* ID!
```

**Note**: The `ObjectID` creates an ID composed of a Unix timestamp, a random value, and a counter. Because of the timestamp embedded inside, you can actually get its value to find out when your document was created!

To add your ID to a new document, simply add it as an `_id` property in the object:

```js
db.collection('users').insertOne({
  _id: new ObjectID(),
  name: 'Dan'
})
```

**Note**: Object IDs are represented in MongoDB as **binary data**. It does this because the string representation *we* see (e.g. `5df51b461217c710848fbb77`) is double the size of the binary version. It's all about space saving. Proof:

```js
const id = new ObjectID() // returns binary representation
console.log(id.id.length) // return 12!
const stringId = id.toHexString() // returns string representation
console.log(stringId.length) // returns 24!
```

### Reading documents

This is the **read** in CRUD. Here are code snippets for the `find` and `findOne` methods:

```js
db.collection('users').findOne({
  _id: new ObjectID('5df51e00f1784519fc76149b'), // <= You MUST convert string into object ID
  name: 'John' // <= Notice that you can search MULTIPLE criteria
}, (error, user) => {
  console.log(user) // if user found, returns object; if no user found, returns **null**
})

db.collection('users').find({ name: 'John' }) // <= returns cursor pointing to data
  .toArray((error, users) => console.log(users)) // <= gets all the data from the cursor
```

**Important**: When you use `find`, MongoDB doesn't assume that you always want *all* matching documents back. Sometimes you just want 5 of the documents or maybe even the number of documents (without reading their contents). In order to allow for this flexibility, `find` returns a **cursor** *pointing* to the matching documents, which you then apply methods to:
* `toArray` gets all the documents
* `limit` limits the documents retrieved when chained *before* `toArray`
* `count` gets the number of documents matching

### Updating documents

This is the **update** in CRUD. Here are the code snippets for the `updateOne` and `updateMany` methods:

```js
const updatePromise = db.collection('users').updateOne({ age: 27 }, {
  $set: { age: 1 } // <= set age to 1 for first user found age 27
})

updatePromise.then(res => console.log(res.matchedCount, res.modifiedCount))

const updateManyPromise = db.collection('users').updateMany({ age: 27 }, {
  $inc: { age: 2 } // <= increments age by 2 for for all users age 27
})

updateManyPromise.then(res => console.log(res.matchedCount, res.modifiedCount))
```

**Note**: Notice that you can also use the **promise structure** for MongoDB instead of just a callback!

More about `updateOne` and `updateMany`:
* The first argument provided is the **filter** parameters and the second is the **update operators**.
* The update operators define what you want to do with the documents targeted by the filter. Read about [update operators](https://docs.mongodb.com/manual/reference/operator/update/) for more info.
* In the promise response, we're interested in `matchedCount` and `modifiedCount` to learn about the status of our update.


### Deleting documents

This is the **delete** in CRUD. Here are the code snippets for the `deleteOne` and `deleteMany` methods:

```js
db.collection('users').deleteOne({ name: 'Dan' })
  .then(res => console.log(res.deletedCount))

db.collection('users').deleteMany( { age: 27 })
  .then(res => console.log(res.deletedCount))
```

Straightforward! It's just like the methods above!