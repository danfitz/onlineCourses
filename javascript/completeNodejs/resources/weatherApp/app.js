const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const locationInput = process.argv[2]

if (!locationInput) {
  console.log('Please provide an address')
} else {
  geocode(locationInput, (error, { latitude, longitude, location }) => {
    if (error) {
      return console.log('Error:', error)
    }
  
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log('Error:', error)
      }
      
      console.log('Geocode Data:', location)
      console.log('Forecast Data:', forecastData)
    })
  })
}