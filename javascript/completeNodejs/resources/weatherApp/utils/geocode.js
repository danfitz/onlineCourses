const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGFuZml0eiIsImEiOiJjazNkOGFnZzgwdWZrM2ZwYjdqejcxbmN2In0.Fz19l5uKH07WvZGSQXV3Ug&limit=1`
  
  request({
    url,
    json: true
  }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to geocode service', null)
    } else if (body.features.length === 0) {
      callback('Location input not found', null)
    } else {
      const data = {
        location: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0]
      }

      callback(null, data)
    }
  })
}

module.exports = geocode