const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const authMiddleware = require('../middleware/auth')

const router = new Router()

router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()

    const token = await user.generateAuthToken()

    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/users/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send({
      error: 'Email and password both required'
    })
  }

  try {
    const user = await User.findByCredentials(email, password)
    const token = await user.generateAuthToken()
    res.status(200).send({ user, token })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post('/users/logout', authMiddleware, async (req, res) => {
  const { user, token } = req

  try {
    user.tokens = user.tokens.filter(someToken => someToken.token !== token)
    await user.save()

    res.status(200).send()
  } catch (error) {
    res.status(500).send()
  }
})

router.post('/users/logoutAll', authMiddleware, async (req, res) => {
  const { user } = req

  try {
    user.tokens = []
    await user.save()

    res.status(200).send()
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/users/me', authMiddleware, async (req, res) => {
  res.status(200).send(req.user)
})

router.get('/users/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  
  try {
    const user = await User.findById(id)

    if (user) res.status(200).send(user)
    else res.status(404).send()
  } catch (error) {
    res.status(500).send()
  }
})

router.patch('/users/:id', authMiddleware, async (req, res) => {
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
    const user = await User.findById(id)

    if (user) {
      updates.forEach(update => user[update] = req.body[update])
      await user.save()
      res.status(200).send(user)
    } else {
      res.status(404).send()
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/users/:id', authMiddleware, async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndDelete(id)
    if (user) res.status(200).send(user)
    else res.status(404).send()
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router