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