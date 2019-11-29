---
categories: [backend]
tags: [nodejs, js]
title: "Complete Node.js Developer Course Module 7: Accessing API from Browser"
source: [udemy]
---

The goal of this section is to learn how to create an **API endpoint** where the data provided is *customizable based on user input*, i.e., query parameters.

## The Query String

For the user to get more custom data, we can accept query strings appended to our API endpoint. This appears in the `req.query` object returned by express in the route handler callback.

```js
app.get('/api', (req, res) => {
    console.log(req.query)
})

// If you go to localhost:3000/api?type=games...
// req.query returns { type: 'games' }
```

If you want to make a query string **required**, you just need to add conditional logic that sends an error response if the query string isn't provided:

```js
if (!req.query.type) {
    res.send({
        error: 'You must provide a type query'
    })
} else {
    res.send(data)
}
```

**Note**: Never have 2 `res.send` calls execute. Every HTTP request can only have one response back. Express will throw an error otherwise.