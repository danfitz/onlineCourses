---
title: "Reaching Out to the Web"
part: 8
date: "2019-11-11"
categories: [frontend]
tags: [react, js]
source: [udemy]
---

# Reaching Out to the Web

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
```

## Removing Interceptors

To eject/remove an interceptor, simply use:

```js
const reqInterceptor = axios.interceptors.request.use(...)
const resInterceptor = axios.interceptors.response.use(...)

// ** TO EJECT INTERCEPTOR **
axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);
```

**Note**: It's a good idea to add `eject` as part of a **cleanup** function like `componentWillUnmount` or the cleanup callback in `useEffect`.

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

## Error Handling HOC

Using interceptors, we can create a higher-order component that handles any `axios` errors and displays them. Here's the basic code:

```js
const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    // Create error state
    const [error, setError] = useState(null)

    // On mount, add axios interceptors to axios instance USED BY WrappedComponent
    useEffect(() => {
      axios.interceptors.request.use(req => {
        setError(null) // <= Reset error state on new request
        return req
      })

      axios.interceptors.response.use(res => res, err => {
        setError(err) // <= Set error state
        return Promise.reject(err)
      })
    }, [setError])

    return (
      <>
        <Modal {/* <= We're using a modal to display the error */}
          show={error ? true : false}
        >
          {error ? error.message : null}
        <Modal />
        <WrappedComponent {...props} /> {/* <= Passing props down to component */}
      </>
    )
  }
}
```

Then in your actual component, add the HOC:

```js
export default withErrorHandler(MyComponent, axios)
```