console.log('Client-side JavaScript file loaded')

const weatherForm = document.querySelector('form')
const locationInput = document.querySelector('input[type="text"]')
const messageOne = document.getElementsByClassName('messageOne')[0]
const messageTwo = document.getElementsByClassName('messageTwo')[0]

weatherForm.addEventListener('submit', event => {
  event.preventDefault()

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`/weather?address=${locationInput.value}`)
    .then(response => {
      response.json().then(data => {
        if (data.error) {
          messageOne.textContent = data.error
        } else {
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecast
        }
      })
    })
})
