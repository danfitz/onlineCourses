const request = require('request')

const geocode = data => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(data.address)}.json?access_token=pk.eyJ1IjoiZGFuZml0eiIsImEiOiJjazNkOGFnZzgwdWZrM2ZwYjdqejcxbmN2In0.Fz19l5uKH07WvZGSQXV3Ug&limit=1`
  
  return new Promise((resolve, reject) => {
    const config = { url, json: true }

    request(config, (error, response) => {
      if (error) {
        reject('Unable to connect to geocode service')
      } else if (response.body.features.length === 0) {
        reject('Location input not found')
      } else {
        const body = response.body
        const newData = {
          ...data,
          location: body.features[0].place_name,
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
        }
  
        resolve(newData)
      }
    })
  })
}

module.exports = geocode