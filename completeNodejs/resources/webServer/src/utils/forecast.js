const request = require('request')
const geocode = require('./geocode')

const forecast = (data) => {
  const url = `https://api.darksky.net/forecast/83914e528bdb1b8fe11edc0dc05453af/${data.latitude},${data.longitude}?units=si`
  
  return new Promise((resolve, reject) => {
    const config = { url, json: true }

    request(config, (error, { body }) => {
      if (error) {
        reject('Unable to connect to weather service')
      } else if (body.error) {
        reject('Unable to find location')
      } else {
        const newData = {
          ...data,
          forecast: `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degree celsius outside. There is ${body.currently.precipProbability}% chance of rain.`
        }

        resolve(newData)
      }
    })
  })
}

module.exports = forecast