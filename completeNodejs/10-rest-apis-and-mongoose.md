---
title: "REST APIs and Mongoose"
part: 10
date: "2019-12-15"
categories: [backend]
tags: [nodejs, js]
source: [udemy]
---

# REST APIs and Mongoose

## Mongoose

Mongoose is a library that makes managing MongoDB easier. In particular, it allows us to create **models** or **schemas** for our data/documents. This means:
* We can define what data types each field in a document will accept
* Which fields are required
* And more

**Note**: Mongoose is known as an **object document mapper** or **ODM**: it maps objects in Node.js to documents in MongoDB.

### Setting up Mongoose

Here's basic setup to start using Mongoose:

1. `npm install mongoose`.
2. `const mongoose = require('mongoose')`.
3. Connect to database *with* database name as path: `mongoose.connect('mongodb://127.0.0.1:27017/dbName', { options })`.
4. Create model: `const User = mongoose.model('User', { fieldsConfig })`.
5. Create model instance: `const instance = new User({ fields })`.
6. Do stuff to the database using instance: `instance.save().then(user => console.log(user))` creates a document.

Here's more details:

```js
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/taskManager', {
  useNewUrlParser: true,
  useCreateIndex: true // <= Used for faster querying
})

const User = mongoose.model('User', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
})

const me = new User({ name: 'Dan', age: 27 })

me.save()
  .then(meAgain => console.log(meAgain))
  .catch(error => console.log(error))
```

Things to note:
* The callback in `then` returns the document created, which will be identical to `me`.
* If you provide the wrong data types, the `catch` method will run its callback!
* In the database, Mongoose creates a field called `_v`, which represents the **version** of the document.

### Data validation and sanitization

**Data validation** is about *forcing* data to conform to some *rules* (like requiring a user's age to be 18 or older). **Data sanitization** is about *altering* and cleaning up the data before saving it (like removing whitespace around a name).

Built-in validators include:

* `type` defines the data type
* `required`
* `min` and `max` for numbers
* `enum`, `match`, `minlength`, and `maxlength` for strings

In order to create a *custom* validator, you just provide a `validate` method that throws an error *if* your logic tests fail:

```js
const User = mongoose.model('User', {
  age: {
    type: Number,
    validate: value => {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  }
})
```

**Pro tip**: For more complex validators, you can download the `validator` npm package.

Built-in sanitizers include:

* `default` sets a default value if one isn't provided
* `lowercase`, `uppercase`, and `trim` tell Mongoose to run `toLowerCase()`, `toUpperCase()`, and `trim()`

## Structuring a REST API

### What is representational state transfer?

**Representational state transfer** allows clients to access and manipulate resources/data using **pre-defined operations**. It's **representational** because the resources/data live on the database/server, and it sends a *representation* of those resources/data to the client.

### CRUD resources

When exposing a resource via pre-defined operations, you usually create a set of CRUD endpoints of this form:

* **Create**
  * POST /tasks (creates new task)
* **Read**
  * GET /tasks (gets all tasks)
  * GET /tasks/:id (gets one task)
* **Update**
  * PATCH /tasks/:id (updates one task)
* **Delete**
  * DELETE /tasks/:id (deletes on task)

### Structure of HTTP requests and responses

HTTP requests have the following structure:

1. **Method, path, protocol**
2. An arbitrary number of **request headers** used to attach *metadata*
   * `Accept` defines what the client expects back
   * `Connection` defines how long to keep a connection alive
   * `Authorization` is used for authentication
   * Etc.
3. **Request body** containing information for processing

```http
POST /tasks HTTP/1.1
Accept: application/json
Connection: Keep-Alive
Authorization: Bearer eklrj093j23kjrl2kjlk

{ "description": "Read a book" }
```

HTTP responses have a similar structure:

1. **Protocol, status code, text representation of status**
2. **Response headers** for metadata
   * `Date` tells you the time that the operation occurred
   * `Server` tells you what server it's coming from
   * `Content-Type` tells you what kind of data is being returned
   * Etc.
3. **Response body**

```http
HTTP/1.1 200 Created
Date: Sun, 28 Apr 2020 15:37:37 GMT
Server: Express
Content-Type: application/json

{ "_id": 12345, "description": "Read a book", "completed": false }
```

## Resource Endpoints

### Create

### Read

### Update

### Delete