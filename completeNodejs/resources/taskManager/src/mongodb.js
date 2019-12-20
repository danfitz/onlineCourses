const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'taskManager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    console.log('Unable to connect to database')
    return
  }
  
  const db = client.db(databaseName)

  // db.collection('users').deleteMany({ age: 27 })
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err))

  db.collection('tasks').deleteOne({ description: 'Go pee' })
    .then(res => console.log(res.deletedCount))
    .catch(err => console.log(err))
})