// Core modules
const path = require('path')
// npm modules
const express = require('express')
const hbs = require('hbs')
// Personal modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

// Initialize express
const app = express()

// Create absolute paths for public folder and template folder
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars and customize views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicPath))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Dan Fitz'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Dan Fitz'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Dan Fitz'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'You must provide an address'
    })

  } else {
    geocode({ address: req.query.address })
      .then(response => forecast(response))
      .then(response => res.send(response))
      .catch(error => res.send({error}))
  }
})

app.get('/products', (req, res) => {
  console.log(req.query)
  res.send({
    name: 'iPhone XS 64GB',
    price: 599.99
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Help',
    errorMessage: 'Help article not found',
    name: 'Dan Fitz'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Dan Fitz'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`)
  console.log(`View it at http://localhost:${port}`)
})