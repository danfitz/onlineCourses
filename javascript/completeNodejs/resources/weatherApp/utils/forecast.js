const request = require('request')
const geocode = require('./geocode')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/83914e528bdb1b8fe11edc0dc05453af/${latitude},${longitude}?units=si`
  
  request({
    url,
    json: true
  }, (error, { body:data }) => {
    if (error) {
      callback('Unable to connect to weather service', null)
    } else if (data.error) {
      callback('Unable to find location', null)
    } else {
      callback(null, `${data.daily.data[0].summary} It is currently ${data.currently.temperature} degree celsius outside. There is ${data.currently.precipProbability}% chance of rain.`)
    }
  })
}

module.exports = forecast