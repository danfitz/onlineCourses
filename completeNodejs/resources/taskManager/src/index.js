const express = require('express')
require('./db/mongoose') // <= connect mongoose
const User = require('./models/user')
const Task = require('./models/task')


// *
// * SETUP
// *

// Initialize
const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(express.json())


// *
// * ROUTES
// *

// Users
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body)
    await newUser.save()
    res.status(201).send(newUser)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send()
  }
})

app.get('/users/:id', async (req, res) => {
  const { id } = req.params
  
  try {
    const user = await User.findById(id)

    if (user) res.status(200).send(user)
    else res.status(404).send()
  } catch (error) {
    res.status(500).send()
  }
})

app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))
  
  if (!isValidOperation) {
    return res.status(400).send({
      error: `Invalid update: only ${allowedUpdates.join(', ')} fields allowed`
    })
  }
  
  const { id } = req.params

  try {
    const user = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )

    if (user) res.status(200).send(user)
    else res.status(404).send()
  } catch (error) {
    res.status(400).send(error)
  }
})

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndDelete(id)
    if (user) res.status(200).send(user)
    else res.status(404).send()
  } catch (error) {
    res.status(500).send()
  }
})

// Tasks
app.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body)
    await newTask.save()
    res.status(201).send(newTask)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).send(tasks)
  } catch (error) {
    res.status(500).send()
  }
})

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params

  try {
    const task = await Task.findById(id)
    if (task) res.status(200).send(task)
    else res.status(404).send()
  } catch (error) {
    res.status(500).send()
  }
})

app.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const notValidOperation = updates.some(update => !allowedUpdates.includes(update))

  if (notValidOperation) {
    return res.status(400).send({
      error: `Invalid update: only ${allowedUpdates.join(', ')} fields allowed`
    })
  }

  const { id } = req.params

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )

    if (task) res.status(200).send(task)
    else res.status(404).send()
  } catch (error) {
    res.status(400).send(error)
  }
})

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params

  try {
    const task = await Task.findByIdAndDelete(id)
    if (task) res.status(200).send(task)
    else res.status(404).send()
  } catch (error) {
    res.status(500).send()
  }
})


// *
// * LISTENING
// *
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})