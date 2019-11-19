---
categories: [backend]
tags: [nodejs, js]
title: "Complete Node.js Developer Course Module 2: Node.js Module System"
---

There are 3 kinds of modules in Node.js:
* Core modules
* Self-created modules
* Third-party modules

## Importing Core Modules

The core Node.js modules can be found in the [docs](https://nodejs.org/en/docs).

Some modules like `console` can be run without loading them.

Other modules like `fs` have to be explicitly loaded in or else Node.js won't understand.

```js
// This loads the module
const fs = require("fs");

// This method synchronously writes
// or overwrites a file @ filename
fs.writeFileSync("notes.txt", "Content goes here");
```

**Note**: `require` is a built-in function provided by Node.js.

## Importing Your Own Files

You can kind of chain code execution of multiple files using `require`:

```js
// From utils.js
console.log("HELLO!");
const name = "Dan";

// From app.js
require("./utils.js") // searches relative path

console.log(name);

// OUTPUT:
// Logs "HELLO!"
// Throws "name is not defined" error
```

`name` throws an error because every node module has its **own scope**, meaning `name` is not defined in `app.js`.

To get around scope, you take advantage of `module.exports` inside the module that you want to share with other modules. Whatever value you assign to `module.exports` in your imported file is what's returned by the `require` function in the target file.

```js
// From utils.js
const name = "Dan";

module.exports = name;

// From app.js
const name = require("./utils.js");

console.log(name); // logs "Dan"
```

**Note**: `module` is an automatically created object representing the current module. That means it's **local to each module**.

**Best practice**: Commonly, modules will assign an entire object to `module.exports`, which contains an entire library of useful properties and methods.

## Importing npm Modules