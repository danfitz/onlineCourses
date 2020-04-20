const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET)

    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    
    if (!user) throw new Error()

    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ error: 'Authentication failed' })
  }
}