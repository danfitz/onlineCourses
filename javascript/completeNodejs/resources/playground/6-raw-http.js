const https = require('https')

const url = `https://api.darksky.net/forecast/83914e528bdb1b8fe11edc0dc05453af/40,-75?units=si`
  

const request = https.request(url, response => {
  let data = ''

  response.on('data', chunk => {
    data += chunk.toString()
  })

  response.on('end', () => {
    console.log(JSON.parse(data))
  })
})

request.on('error', error => {
  console.log('Error:', error)
})

request.end()