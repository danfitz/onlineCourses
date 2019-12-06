const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'taskManager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    console.log('Unable to connect to database')
    return
  }

  const db = client.db(databaseName)

  // db.collection('users').insertOne({
  //   name: 'John',
  //   age: 27
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert user')
  //   }

  //   console.log(result.ops)
  // })

  // db.collection('users').insertMany([
  //   {
  //     name: 'Jen',
  //     age: 55
  //   }, {
  //     name: 'Gunther',
  //     age: 10
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     console.log('Unable to insert documents')
  //     return
  //   }

  //   console.log(result.ops)
  // })

  db.collection('tasks').insertMany([
    {
      description: 'Water the plants',
      completed: false
    }, {
      description: 'Go pee',
      completed: true
    }
  ], (error, result) => {
    if (error) {
      return console.log('Unable to insert documents')
    }

    console.log(result.ops)
  })
})