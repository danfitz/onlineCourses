const { Router } = require('express')
const Task = require('../models/task')

const router = new Router()

router.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body)
    await newTask.save()
    res.status(201).send(newTask)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).send(tasks)
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/tasks/:id', async (req, res) => {
  const { id } = req.params

  try {
    const task = await Task.findById(id)
    
    if (task) res.status(200).send(task)
    else res.status(404).send()
  } catch (error) {
    res.status(500).send()
  }
})

router.patch('/tasks/:id', async (req, res) => {
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
    const task = await Task.findById(id)

    if (task) {
      updates.forEach(update => task[update] = req.body[update])
      await task.save()
      res.status(200).send(task)
    } else {
      res.status(404).send()
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params

  try {
    const task = await Task.findByIdAndDelete(id)
    if (task) res.status(200).send(task)
    else res.status(404).send()
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router