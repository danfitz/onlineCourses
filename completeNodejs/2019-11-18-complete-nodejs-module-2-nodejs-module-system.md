---
categories: [backend]
tags: [nodejs, js]
title: "Complete Node.js Developer Course Module 2: Node.js Module System"
source: [udemy]
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

npm modules give us the power to leverage reusable code that solves common developer problems or provides commonly sought app functionality. That way we can focus our efforts on what's *unique* to our application instead of reinventing the wheel. (It's tough building your own library and dealing with and testing every edge case.)

Here are the steps for importing npm modules:

1. In the root directory of your app, run `npm init`. This creates a `package.json` configuration file that manages all your app's dependencies.
  * **Note**: npm will run you through configuration prompts. Most of these prompts are useful for devs *creating* packages. Devs *consuming* packages don't need to worry as much.
  * Prompts we care about include: `git repository` and `test command`, as this is important for deployment.

2. Install a package using `npm install <package>`. This creates a `package-lock.json` file and a `node_modules` folder containing your package. Both are maintained by npm. You don't touch them.
  * `package-lock.json` is just a helper file to make installing npm packages faster and more secure. It lists URLs where packages were fetched from, version numbers, and SHA integrity hashes to ensure future package installations match past ones.
  * **Note**: There's no point editing files in `node_modules` because when someone runs `npm install`, those changes will just get overwritten.

3. Load module into file using `const module = require("module");`. It's now ready to use.
  * **Note**: You're not using a relative path with `"module"`. Node.js knows you're referencing the `node_modules` folder.

4. Finally, go read the docs on the package! You won't know how to use it without the docs.

### Global npm modules

Global npm packages give us new commands to use in the terminal.

Here's how you install and use **nodemon**, a package that runs code, monitors if any changes are saved to the file, then re-runs the code if changes occur. (nodemon = node monitor)

1. `npm install -g nodemon`. `-g` is the global flag, which adds command to operating system.
2. `nodemon file.js` runs the code in `file.js` then exits and monitors for changes. When changes occur, it re-runs code.