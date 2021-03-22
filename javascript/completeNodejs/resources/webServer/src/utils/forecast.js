const request = require('request')
const geocode = require('./geocode')

const forecast = data => {
  const url = `https://api.darksky.net/forecast/83914e528bdb1b8fe11edc0dc05453af/${data.latitude},${data.longitude}?units=si`
  
  return new Promise((resolve, reject) => {
    const config = { url, json: true }

    request(config, (error, response) => {
      if (error) {
        reject('Unable to connect to weather service')
      } else if (response.body.error) {
        reject('Unable to find location from latitude and longitude')
      } else {
        const body = response.body
        const newData = {
          ...data,
          forecast: `${body.daily.data[0].summary} It is currently ${body.currently.temperature.toFixed(1)} degrees celsius outside. There is ${body.currently.precipProbability}% chance of rain.`
        }

        resolve(newData)
      }
    })
  })
}

module.exports = forecast