const express = require('express')
require('./db/mongoose') // <= connect mongoose
const User = require('./models/user')
const Task = require('./models/task')

// *
// * Setup
// *
// Initialize
const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(express.json())

app.post('/users', (req, res) => {
  const newUser = new User(req.body)

  newUser.save()
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error))
})

app.post('/tasks', (req, res) => {
  const newTask = new Task(req.body)

  newTask.save()
    .then(task => res.status(201).send(task))
    .catch(error => res.status(400).send(error))
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})