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

However, `process.argv` isn't great at parsing strings, especially when we use flags.

```js
// In console: node app.js add --title="New Note"

console.log(process.argv[3]);
// Logs "--title='New Note'" as one long string
```

In order to parse strings to use flags in our commands, we can import `yargs`.