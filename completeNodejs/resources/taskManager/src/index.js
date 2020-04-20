require('dotenv').config()

const express = require('express')
require('./db/mongoose') // <= connect mongoose

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
app.use(require('./routers/user'))
app.use(require('./routers/task'))


// *
// * LISTENING
// *
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//   const token = jwt.sign({ _id: '1234abcd' }, 'thisismysecret', { expiresIn: '0 seconds' })
//   console.log(token)

//   const data = jwt.verify(token, 'thisismysecret')
//   console.log(data)
// }

// myFunction()