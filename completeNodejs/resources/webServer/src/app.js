const path = require('path')
const express = require('express')
const hbs = require('hbs')

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
  res.send({
    forecast: 5.54,
    location: 'Toronto, ON, Canada'
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

app.listen(3000, () => {
  console.log('Server is up on port 3000!')
  console.log('View it at http://localhost:3000')
})