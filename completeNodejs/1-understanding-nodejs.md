---
title: "Understanding Node.js"
part: 1
date: "2019-11-18"
categories: [backend]
tags: [nodejs, js]
source: [udemy]
---

# 1 - Understanding Node.js

## What is Node.js?

Originally, JavaScript could only be run inside the browser, limiting what it could do.

With Node.js, JavaScript could be used **server-side**, allowing devs to create:
* Web servers
* Command line interfaces
* Application backends
* And more

### How is it possible to run JavaScript server-side?

According to the [Node.js website](https://nodejs.org), Node.js is a **JavaScript runtime** built on **Chrome's V8 JavaScript engine**. Let's break that down.

A JavaScript engine takes in JavaScript code and compiles it down to machine-readable code. **Chrome's V8 JavaScript engine** does this for Chrome browsers. All browsers each have their own engine. Node.js leverages the V8 JavaScript engine to perform compilation.

**Note**: The V8 engine is written in C++. So is Chrome and Node.js!

Node.js is a **JavaScript runtime**: something that provides tools and libraries specific to the Node.js environment. In the browser, its runtime includes things like the `window` object and `document` object (for DOM manipulation). In Node.js, these tools and libraries include the `fs` (filesystem) and `os` objects. They allow you to do things like:
* Set up web servers
* Integrate with file systems for reading and writing

These special tools in Chrome and Node.js are written in C++. They're what allow you to manipulate the DOM or file systems (respectively), even though these features aren't technically built into JavaScript. They are called **bindings**. For example, `document.querySelector` in Chrome is binded to a C++ function written in Chrome. So is `fs.readFile` in Node.js.

In contrast, things like the `String` and `Number` prototypes are provided directly by the V8 engine itself, not Node.js or the browser. They're what allow you to do things like `"Dan Fitz".length` or `2 + 3`.

**Pro tip**: You can access Node.js API bindings in their [docs](https://nodejs.org/en/docs/).

### Differences between browser and Node.js

Node.js comes with these objects and more:
* `global` is closest to `window` in the browser: it provides the initial execution context with tons of built-in properties and methods.
* `process` is closest to `document`: it gives us the ability to manipulate the Node process running.
  * Example: `process.exit()` exits the Node.js REPL.


## Why Should I Use Node.js?

Furthering the description of Node.js on their site:

Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

### Event-driven non-blocking I/O model

When Node.js reads data from a file or queries data from a database, it's performing an **I/O operation**. It's sending a request or input and receives data or an output back.

The nature of I/O is that it takes *time* to perform. That's why Node.js is **non-blocking**: while waiting for a response, it can continue to run code.

**Pro tip**: An extra feature of non-blocking runtimes like Node.js is that they *overlap* I/O operations. If I send 2 database queries, they can run *concurrently* in the background.

These 2 database queries are often given callbacks, which execute when the data is returned. Just like the event queue in the browser, that's why Node.js is **event-driven**.

Example:

```js
// The callback runs when the query is complete
getUser(1, user => console.log(user));
```

### npm

Node.js makes npm possible. (I suppose because of its ability to create CLIs and its ability to read and write files in file systems.) Because npm is such a huge package manager, it's an incredible resource that can solve almost anything.