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

