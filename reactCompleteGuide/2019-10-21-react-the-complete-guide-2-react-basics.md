---
categories: [frontend]
tags: [react]
title: "React - The Complete Guide Module 2: React Basics?"
---

## Build Workflow

Creating a build workflow matters because:

* We want to ship optimized code (e.g. small file sizes)
* We want to use ES6 features
* We want to be *productive* (linting, CSS prefixes)

For a build workflow, we need the following:

* Dependency management tool like **npm** or **yarn**
* **Bundler** like **Webpack** that allows us to split code into multiple, modular files, which bundle into a couple of files in the end at build
* **Compiler** like **Babel + Presets** that converts ES6 JS to ES5 or lower
  * **Note**: Babel is *part* of the Webpack configuration
* **Development server** that allows local testing on machine

**Pro tip**: `create-react-app` is a package that handles all of this for us out of the box!

## Understanding JSX

JSX is basically *syntactic sugar* that gets compiled down to nested `React.createElement` calls:

```js
return (
  <div className="App">
    <h1>React App</h1>
  </div>
);

// is equivalent to...

return React.createElement(
  "div",
  { className: "App" },
  React.createElement(
    "h1",
    null,
    "React App"
  )
);
```

When React sees JSX, it basically creates nested elements using nested `React.createElement` calls.

**Pro tip**: That's why you have to write `import React from "react";` at the top of your file!

### JSX restrictions

* There are special JSX attributes like `className` that aren't 100% identical to HTML attributes.
* Components have to return 1 parent JSX element. (**Note**: Adjacent returned elements are possible but not recommended.)

### Component naming conventions

It's best practice to **capitalize** your component names, so that they don't conflict with other JSX you render on the page. For example, `Div` is different from `div`.

## Functional Components

**Best practice**: You should *almost always* use functional components.

## Class Components