const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'taskManager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    console.log('Unable to connect to database')
    return
  }
  
  const db = client.db(databaseName)
  
  // db.collection('users').findOne({ _id: new ObjectID('5df51e00f1784519fc76149b') }, (error, user) => {
  //   if (error) {
  //     console.log('Unable to fetch user')
  //     return
  //   }

  //   console.log(user)
  // })

  // db.collection('users').find({ age: 27 }).toArray((error, users) => {
  //   console.log(users)
  // })

  // db.collection('users').find({ age: 27 }).count((error, count) => console.log(count))

  // db.collection('tasks').findOne({ _id: new ObjectID('5de9d3c7a3fe6811209273a4') }, (error, task) => {
  //   if (error) {
  //     return console.log('Task not found')
  //   }

  //   console.log(task)
  // })

  db.collection('tasks').find({ completed: false })
    .limit(1)
    .toArray((error, tasks) => {
      if (error) {
        return console.log('Tasks not found')
      }

      console.log(tasks)
    })

  // db.collection('tasks').find({ completed: false })
})