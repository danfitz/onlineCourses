---
title: "Web Servers"
part: 6
date: "2019-11-24"
categories: [backend]
tags: [nodejs, js]
source: [udemy]
---

# Web Servers

## What is Express?

**Express** is an npm module that makes it really easy to create **web servers** with Node.js. These servers allow you to serve up **all assets** to an application: HTML files, CSS for styling, client-side JS for user interaction, and more. Also, we'll be able to serve up JSON data, effectively building our own APIs.

## Setting up Basic Web Server

1. `const express = require('express')` imports express into file.
2. Create a new instance of express by calling it: `const app = express()`.
  * **Note**: Now all the configuration happens using properties and methods *inside* the `app` object.
3. You now define how you want each route of your URL to behave using `app.get`.
4. Inside `app.get`, we must first provide a route, e.g., `'/about'` for website.com/about or `'/'` for root.
5. Then we must provide a callback: the function that gets called when user visits route. The callback receives 2 arguments:
  * `req`: details from the browser telling you the nature of the request
  * `res`: useful methods for creating a response back to the user
6. Finally, we must start the web server using `app.listen(portNum)`.
  * **Note**: You can also pass a callback that runs when the web server successfully starts.
  * **Pro tip**: Port 80 is the usual port for HTTP sites, while port 3000 is a conventional port for dev testing.

Here's all the steps in action:

```js
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello express!')
})

app.listen(3000, () => {
  console.log('Server is up on port 3000!')
  console.log('View it at http://localhost:3000')
})
```

## Serving up HTML and JSON

The process of serving up HTML and JSON for our routes is literally just about passing it into `res.send`.

```js
res.send('<h1>I\'m an HTML tag</h1>') // HTML
res.send({ // <= JSON (converted from object)
  key: 'value',
  key2: 'value2'
})
```

### Serving up files in a directory

Best practice is to place files that you want to serve to your user in a `build` folder at the root. In order to access `build` from the `app` object, you need to do the following:

1. Use `path.join` to join `__dirname` with `'../public'`. This creates an absolute path to `public`.
  * `__dirname` is an absolute path to `src`.
  * By joining `'../public'` using `path.join`, you go up 1 directory to `public`.
  * **Note**: `path.join` is a cross-OS compatible way to create a path.
2. Make `app` aware of `public` using `app.use`, passing the absolute path to `public` via `express.static`.
  * `app.use(express.static(absPathPublic))`

**Pro tip**: Remember how Node.js wraps our code inside a function, injecting new variables and functions? `__dirname` and `__filename` are part of this.

## Dynamic Pages with Template Engine

When we use `express.static`, we're handing express a static directory. That means the contents of the directory never change.

Using template engines like **handlebars**, we can do 2 things:
1. Render dynamic content
2. Create reusable code that can be used across these dynamic pages, e.g. reusable header

### Configuring handlebars

1. `npm install hbs`. (We use `hbs` because it's configured to work with express.)
2. Configure express to recognize `hbs` using `app.set('view engine', 'hbs')`.
  * **Note**: `app.set` is the standard way to configure anything in express.

**Bonus**: You can customize the directory of your templates using...

```js
app.set('views', path.join(__dirname, '../newDirName'))
```

### Rendering dynamic content

Here's instructions to render dynamic content using handlebars:

1. Create `views` directory at root.
2. Create `myTemplate.hbs` and place HTML inside. All dynamic content is in this format: `{{ varName }}` (like jinja).
  * **Note**: You can reference assets inside `public` using relative paths still!
3. Inside an `app.get` callback, call `res.render('myTemplate', { varName: 'value' })`. Now your template has access to dynamic variables!

### Reusable template partials

**Partials** are reusable bits of HTML that you can include in your handlebars templates (e.g. headers).

1. `const hbs = require('hbs')` for the module.
2. Tell handlebars where we're going to put our partials: `hbs.registerPartials(partialsPath)`.
3. At `partialsPath`, create your partial snippet of HTML `partial.hbs`
4. Inside one of your templates, you can now inject your partial via `{{>partial}}`.
5. **Bonus**: Your partial can reference the same variables passed into your templates via `res.render`.

**Note**: If you're running `nodemon`, you'll need to provide an `-e js,hbs` flag to your command to tell `nodemon` to listen for hbs files as well.

## 404 Page

A 404 page is basically a **catch-all** for every URL path *other* than ones you explicitly created using `app.get`.

To do this, you need to use a **wildcard** in `app.get` like `app.get('*', ...)`.

**Note**: You must place this wildcard as the *last* `app.get` call. That's because when a user visits your web server, it searches for a match to your route from top to bottom.

```js
// 1. First checks to see if URL matches static file
app.use(express.static(publicPath))

// 2. Then checks your explicit app.get calls
app.get('/', ...)
app.get('/about', ...)

// 3. Finally matches wildcard
app.get('*', ...)
```

**Pro tip**: The wildcard character can include a specific pattern. For example, `/help/*` matches any routes that are subpaths of `/help`.