const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate: value => {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate: value => {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain the word "password"')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

// Hashes password before saving
userSchema.pre('save', async function(next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  
  next()
})

// Finds user by email, checks if password matches, and returns user
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) throw new Error('Unable to login')

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) throw new Error('Unable to login')

  return user
}

// Generates token for specific user
userSchema.methods.generateAuthToken = async function() {
  const user = this
  
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.SECRET,
    { expiresIn: '1 day' }
  )

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

// Returns user information MINUS tokens
userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject() // Removes methods
  const { password, tokens, ... publicUserInfo } = userObject

  return publicUserInfo
}

const User = mongoose.model('User', userSchema)

module.exports = User