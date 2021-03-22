---
title: "Asynchronous Node.js"
part: 5
date: "2019-11-24"
categories: [backend]
tags: [nodejs, js]
source: [udemy]
---

# Asynchronous Node.js

## The HTTPS Core Module

Higher-level modules like `axios` and `request` actually use Node.js's core modules `HTTPS` or `HTTP`. These modules are lower-level, so they require more actions.

```js
// 1. Import https core module
const https = require('https')

const url = `https://api.darksky.net/forecast/83914e528bdb1b8fe11edc0dc05453af/40,-75?units=si`
  
// 2. Create request object
const request = https.request(url, response => {
  // 3. Initialize empty string
  let data = ''

  // 4. On new chunk of data, a buffer is returned; concatenate the string version of the buffer to data
  response.on('data', chunk => {
    data += chunk.toString()
  })

  // 5. On completion of request, convert data from JSON to JS object
  response.on('end', () => {
    console.log(JSON.parse(data))
  })
})

// NOTE: On error during request, call callback
request.on('error', error => {
  console.log('Error:', error)
})

// 6. COMPLETE the actual request
request.end()
```

