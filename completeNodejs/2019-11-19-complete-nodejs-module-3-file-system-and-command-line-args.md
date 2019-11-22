---
categories: [backend]
tags: [nodejs, js]
title: "Complete Node.js Developer Course Module 3: File System and Command Line Args"
---

## Command Line Arguments

When you provide arguments to a CLI, Node.js has access to those arguments in the `process.argv` array (v stands for vector).

```js
node app.js Dan // 3 arguments: node executable, app.js file, and string "Dan"

// In app.js...
console.log(process.argv);
// Logs ["/path/to/node", "path/to/app.js", "Dan"]
```

If we want to use our command line arguments to influence the behaviour of our application, we simply create conditional logic!

```js
// In console: node app.js add

if (process.argv[2] === "add") {
  // Add stuff
};
```

However, `process.argv` isn't great at parsing strings, especially when we use flags. In order to parse strings to use flags in our commands, we can import modules like `yargs`.

```js
// In console: node app.js add --title="New Note"

console.log(process.argv[3]);
// Logs "--title='New Note'" as one long string

const yargs = require("yargs");
console.log(yargs.argv.title);
// Logs "New Note"
```

## Yargs tips

1. By default, modules like `yargs` provide a `--help` flag showing other available flags. One other default flag is `--version`, which starts at v1.0.0. You can update this using `yargs.version("1.1.0");`.

2. To add commands to `yargs`, use the `yargs.command` method and pass a configuration object inside. The key property is `handler`, which runs the callback you provide when the command is invoked.

3. `yargs.parse()` must appear the bottom of your code in order for anything to appear on your command line.

## Storing Data

Now that we can obtain inputs using `yargs` and the command line, how do we store that data? Basic answer is to use the `fs` (file system) built-in Node.js module

### In JSON

JSON is just a string. JavaScript provides the `JSON` API to easily convert JS objects to and from JSON. (`JSON.stringify` converts objects to JSON. `JSON.parse` converts JSON to objects.)

```js
// Example
const json = JSON.stringify(obj);
```

Using the `fs` module, we can perform the following steps to write data into JSON and then read from it.

1. Create a JS object.
2. `JSON.stringify(obj);` to convert to JSON.
3. `fs.writeFileSync("file.json", json);` to write JSON string to file.
4. `const dataBuffer = fs.readFileSync(file.json);` to return a **data buffer** (it's bytes, not strings).
5. `dataBuffer.toString();` to convert data buffer to JSON string.
6. `JSON.parse(json);` to convert JSON back to object.
7. Now you can use object in your code!