---
title: "API Authentication and Security"
part: 11
date: "2020-04-19"
categories: [backend]
tags: [nodejs, js]
source: [udemy]
---

# API Authentication and Security

The goal of this section is to learn how to lock down and secure an API that is currently open. That means securely storing passwords, setting up rules on what can and can't be read by a user, requiring them to authenticate themselves to access resources, etc.

## Securely Storing Passwords

In a naive API and database, passwords are stored as *plaintext*. That means passwords are exposed. If someone were to get their hands on the data, they could now break into a user's accounts.

The solution we'll be implementing is to store **hashed passwords**: values algorithmically generated from passwords that are *one-way*, i.e., can't be reversed or decrypted. The hashing algorithm library we'll be using is `bcryptjs`:

```js
const hashAndCompare = async () => {
  const password = 'mypassword'
  const hash = await bcrypt.hash(password, 8) // # of ROUNDS the algorithm goes through; more takes longer, less means less security

  const isMatch = await bcrypt.compare(password, hash)
}
```

### Hashing in model middleware

Object modelers like Mongoose allow you to apply *middleware* that run before saving to the database. We can apply a hashing algorithm as middleware in a Mongoose schema:

```js
const userSchema = mongoose.Schema(/* object */)

// Overwrites plaintext password with hashed password BEFORE saving
userSchema.pre('save', async function(next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  
  next()
})
```

## Logging in Users

To log in users, we just need to

1. Find the user by email, and
2. Check if the given password matches the hashed password.

```js
// We can wrap this logic in our own CUSTOM static model method
userSchema.statics.findByCredentials = async (email, password) => {
  // Find user
  const user = await User.findOne({ email })

  // If email not found...
  if (!user) throw new Error('Unable to login')

  // Check if password matches hash
  const isMatch = await bcrypt.compare(password, user.password)

  // If password doesn't match...
  if (!isMatch) throw new Error('Unable to login')

  return user
}

app.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    res.send(user)
  } catch (error) { // <= Catches 'Unable to login' messages
    res.status(400).send(error)
  }
})
```

**Pro tip**: When throwing error messages related to authentication, you want to keep it **generic** so as not to give away too much information.

## Authentication Tokens

As you build out an API, your endpoints will fall into one of two types:

* Public routes
  * Examples: login and sign-up
* Routes that require authentication
  * Examples: viewing your own tweets, creating a post

The way to enforce authentication is to use an **authentication token**. When the user logs in, they're given a token to give them access to closed routes.

### JSON web tokens

A popular type of authentication token is the **JSON web token**.

A JSON web token has 3 components:

* Header information
  * Displays metadata like algorithm used or type of token
* Data
  * Information you pass into the algorithm gets stored here
  * **Note**: Your token will have `iat` (issued-at timestamp) and could have `exp` (expiry timestamp)
* Signature
  * This is a secret key used in the algorithm to verify that the token was made by the server

We'll use the `jsonwebtoken` library to implement our own JSON web tokens:

```js
// Signature usually stored as environment variable
const secretSignature = process.env.SECRET_SIGNATURE

const payload = {}

// Creating token
const token = jwt.sign(
  payload,
  secretSignature,
  { expiresIn: '7 days' } // options
)

// Verifying token
// Returns data OR throws error
const returnedData = jwt.verify(token, secretSignature)
```

### Generating, saving, and sending tokens

When a user logs in, you need to do the following:

1. Generate the token.
2. Save it in the database associated with the user.
3. Send the token back in the HTTP response.

Here's the code for steps 1, 2, and 3:

```js
// In model...
userSchema.methods.generateAuthToken = async function() {
  const user = this
  
  const token = await jwt.sign(
    { _id: user._id.toString() }, // payload
    'secret',
    { expiresIn: '1 day' } // options
  )

  // Adds a new token doc into tokens subcollection
  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

// In router...
app.post('/login', async (req, res) => {
 const user = await User.findByCredentials(req.body.email, req.body.password)
 const token = await user.generateAuthToken()
 res.send({ user, token })
})
```

### BONUS: How middleware work

As a preface to the next heading, we'll explain how middleware work in express:

A middleware is basically a function that gets called *between* when a new request is made and when a route handler processes and responds to it. It has access to `req` and `res` as normal, and it has a `next` function that tells express to move onto the next middleware or the route handler.

```js
// Stops short all GET requests, instead sending custom response message
app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.status(400).send('GET requests are disabled')
  } else {
    next()
  }
})
```

Middleware are a great place to control the flow of your routes and to implement checks before handling a request--like authentication!

### Authenticating tokens

When a user makes a request to a route that requires authentication, a smart design choice is to use a *middleware* to gatekeep your routes:

1. Validate that the token provided can be found in the database.
2. If the token is good, move onto the route handler.
3. Finally, pass the middleware to the routes that you want to lock down via authentication.

In the request header, the user must send the token they were issued.

```http
Authorization: Bearer 3202j3gj32j2309fj.230932jf2.23f092j3f
```

**Note**: A good idea when creating your tokens is to include the user's `_id` in the payload. That way you can use the `_id` to query for the token within the user's data--like this:

```js
const authMiddleware = async (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization').replace('Bearer ', '')

  // Decode payload
  const decoded = jwt.verify(token, 'secret')

  // Find user using decoded._id AND token
  const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

  // Attach user and token to request, allowing route handler to access user info
  req.user = user
  req.token = token
  next()
})

// In route file, pass auth middleware to route
router.get('/profile', authMiddleware, (req, res) => {
  // This only runs IF authentication succeeds
})
```

## Logging out Users

Because our endpoints can include an `authMiddleware` that passes `user` and `token` information, setting up a logout endpoint is a breeze:

1. Simply remove the token from `tokens`, then
2. Save and send `200` response.

```js
app.post('/logout', authMiddleware, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens(token => token.token !== req.token)
    await req.user.save()
    res.status(200).send()
  } catch (error) {
    res.status(500).send()
  }
})
```

## Hiding Private Data

In our naive endpoints setup, any query to user information automatically returns everything, *including* password and tokens.

One solution is to implement a `getPublicProfile` instance method:

```js
// In model user.js
userSchema.methods.getPublicProfile = function() {
  const user = this
  const userObject = user.toObject() // removes methods
  
  // Strips away private data
  delete userObject.password
  delete userObject.tokens

  return userObject
}

// In endpoint
app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.send(user.getPublicProfile())
})
```

**Pro tip**: Whenever you send a response, express automatically serializes the object into JSON using `JSON.stringify`. However, you can override what gets serialized by including a `toJSON` method in the object. By doing this, the return value of `toJSON` is instead serialized.

Here's a simple example:

```js
const person = {
  name: 'Dan',
  age: 27,
  toJSON: () => ({ message: 'I get serialized instead' })
}

console.log(JSON.stringify(person))
// Logs { "message": "I get serialized instead" }
```

Applied to removing private data...

```js
// In model user.js
userSchema.methods.toJSON = function() {
  // Same stuff...
}

// In endpoint
app.get('/users/:id', async (req, res) => {
  const user = User.findById(req.params.id)
  res.send(user) // AUTOMATICALLY removes private data now
})
```

## Authenticating User Endpoints