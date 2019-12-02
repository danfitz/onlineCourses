---
title: "Reaching Out to the Web"
part: 8
date: "2019-11-11"
categories: [frontend]
tags: [react, js]
source: [udemy]
---

# 8 - Reaching Out to the Web

## HTTP Requests in React

1. `npm install axios` and import it: `import axios from "axios";`.

2. Create a `Promise` object using `axios.get`, `axios.post`, etc.

3. Chain `.then()` and `.catch()` for handling `response` and `error` respectively.

## Adding Interceptors

It's very common to handle errors and HTTP requests locally within a component. For example, a component may have a `this.state.error` to track if something breaks during a `.catch()`. Then, the UI will render a message to the user if `this.state.error` has content.

However, on top of local HTTP request and error handling, you can use **interceptors** that add global customization to your HTTP requests and errors.

Think of interceptors as **middle men** that are passed the `request`, `response`, or `error` object to do custom work. Then you pass the objects forward for local handling.

```js
// In a global file like index.js, add this...

// ** FOR REQUESTS **
const reqInterceptor = axios.interceptors.request.use(request => {
  // Do something before request is sent
  // COMMON PRACTICE: Add authorization headers

  return request; // pushes forward request for local handling
}, error => {
  // Do something with error
  return Promise.reject(error); // pushes forwards error for local handling
});

// ** FOR RESPONSES **
const resInterceptor = axios.interceptors.response.use(response => {
  // Do something with response data
  return response; // pushes forward response for local handling
}, error => {
  // Do something with error
  return Promise.reject(error); // pushes forwards error for local handling 
});

// ** TO EJECT INTERCEPTOR **
axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);
```

## Global Configuration

`axios` and other request libraries give you access to a `defaults` object for configuring defaults.

```js
// In a global file like index.js...

axios.defaults.baseURL = "https://api.com/v1"; // Base URL for API endpoint
axios.defaults.headers.common // For headers that apply to all requests
axios.defaults.headers.post // For headers specifically for POST requests
```

## Axios Instances

Sometimes your `axios` configuration needs to be different for different situations. For this, you can set up half measures known as an **instance**.

```js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.com/v2"
});

// axiosInstance.interceptors works too
// axiosInstance.defaults works too

export default axiosInstance;
```

Now you can use `axiosInstance` for HTTP requests and even create multiple instances.

**Pro tip**: Instances work because of prototypal inheritance! You're overriding default behaviour in the global `axios` object. If you don't override, `axiosInstance` will inherit `axios` properties.

