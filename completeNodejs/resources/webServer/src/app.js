const path = require('path')
const express = require('express')

const app = express()

app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs') // sets up handlebars

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Dan Fitz'
  })
})

app.get('/weather', (req, res) => {
  res.send({
    forecast: 5.54,
    location: 'Toronto, ON, Canada'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000!')
  console.log('View it at http://localhost:3000')
})