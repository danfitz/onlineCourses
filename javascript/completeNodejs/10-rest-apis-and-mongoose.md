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

Please refer to the code [here](resources/taskManager/src/routers/user.js) to see how to structure resource endpoints. Things to note:

* We use clear status codes to communicate meaning.
* When you provide a string `id` to Mongoose, it will convert it to an `ObjectId` for you.

**Pro tip**: For a list of all status codes, see [httpstatuses.com](https://httpstatuses.com).

## Async/Await

When you define a function as `async`, its invocation returns a *promise* with

* The returned value as the resolved value or
* Any thrown error or rejected promise's value as the rejected value.

```js
const resolvedAsync = async () => {
  return 'I resolve'
}

// logs 'I resolve'
resolvedAsync().then(console.log)

const rejectedAsync = async () => {
  throw new Error('I reject')
  // OR
  await badApiCall()
}

// logs error with 'I reject' message
// OR rejected value of bad API call
rejectedAsync().catch(console.log)
```

An extremely valuable bonus to `async` is that it provides the `await` operator *inside* of the function. `await` is basically syntactic sugar where code can look like it's running synchronously, making it easier to read. You can even store the *resolved* value in a variable.

```js
const awaitAsync = async () => {
  const val = await apiCall()
  const val2 = await apiCall(val)
  const val3 = await apiCall(val2)
}
```

**Note**: If one of your `await` functions gets rejected, the `async` function exits, and you can catch the rejected value.

```js
const awaitAsync = async () => {
  await rejectedApiCall()
  await goodApiCall() // Never runs
}

awaitAsync().catch(console.log)
```

**Pro tip**: A huge benefit of `await` is also the fact that your asynchronous calls are all in the same scope. That means that if you need to share values or variables, it's easy.

### Common patterns

With all of this information in mind, `async` functions form a coding pattern where you package together multiple asynchronous operations and use a `then` and `catch` to handle all of them together:

```js
const multipleApiCalls = async () => {
  const result = await firstApiCall()
  const result2 = await secondApiCall(result)
  return result2
}

multipleApiCalls()
  .then(result => console.log(result)) // <= only runs if all successful
  .catch(error => console.log(error)) // <= catches any errors
```

Another pattern you can utilize is the `try/catch` block *inside* the `async` function. This is useful when you don't care about what is returned by the `async` function--like in a callback function!

```js
// Example with express
app.get('/users', (req, res) => {
  try {
    const users = await getUsers()
    res.send(users)
  } catch (error) {
    res.status(400).send(error)
  }
})
```