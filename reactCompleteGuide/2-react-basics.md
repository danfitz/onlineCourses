---
title: "React Basics"
part: 2
date: "2019-10-21"
categories: [frontend]
tags: [react, js]
source: [udemy]
---

# React Basics

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

### JSX expressions

You can display the evaluation of a JavaScript expression *inside* your JSX using `{}`:

```js
<p>1 + 1 = {1 + 1}</p>
```

**Note**: The `{}` *only* take JavaScript expressions. Nothing else.

### Component naming conventions

It's best practice to **capitalize** your component names, so that they don't conflict with other JSX you render on the page. For example, `Div` is different from `div`.

## Components

### Stateless vs. stateful components

Functional and class components tend to get broken up into **stateless** and **stateful** components.

Stateless components have the following descriptions:
* Dumb (they don't have logic)
* Presentational (they just display stuff)

Stateful components are described as:
* Smart (they have logic)
* Containers (they contain information)

**Best practice**: You should *almost always* use stateless components because they're easier to manage. Minimize the number of stateful components to minimize over-complexity.

### props.children

Your custom components can have content *nested inside* them:

```js
<Component name="Dan">Hello!</Component>
```

To access `"Hello!"`, I can just call `props.children`:

```js
const Component = (props) => {
  return (
    <div>
      <p>My name is {props.name}!</p>
      <p>{props.children}</p>
    </div>
  );
};
```

**Note**: `props.children` doesn't have to be text. It can be *more* JSX!

## State (and props)

`props` is useful when you want to get information from *outside* the component.

`state` is useful when you want to control information from *inside* the component.

Anytime you update `props` or `state`, React checks the DOM to see if information needs changing and makes the appropriate changes.

## useState Hook

As of React 16.8, functional components have state using **React hooks**.

React hooks are functions like `useState` that add extra functionality to your functional components.

Here's the code pattern:

```js
import React, { useState } from "react";

const app = () => {
  // useState makes React aware of initial state, returning an array with:
  // 1. current state
  // 2. setState method
  const [counterState, setCounterState] = useState({
    counter: 1
  });

  // Here's an event callback function just like normal!
  const handleClick = () => {
    // setState works as normal
    setCounterState({
      counter: counterState.counter + 1
    });
  };

  // Referencing state works normally too!
  return (
    <div>
      <p>{counterState.counter}</p>
      <button onClick={handleClick}>Increase initial state</button>
    </div>
  );
};
```

**Major difference**: `useState` doesn't carry over untouched state when using `setCounterState`. You must *manually* bring the state over.

```js
const [counterState, setCounterState] = useState({
  counter: 1,
  otherState: "hello"
});

setCounterState({
  counter: counterState.counter + 1,
  otherState: counterState.otherState // manual!
});
```

**Best practice**: Instead of updating state all with one method, it's better to `useState` for each piece of data you want to keep track of. This is known as **state slicing**.

**Note**: `useState` can take any piece of data, not just objects!

```js
const [counterState, setCounterState] = useState({
  counter: 1
});

const [otherState, setOtherState] = useState("some other value");
```

**Pro tip**: Technically, you don't need to use class-based components at all anymore. However, class-based components are still considered the *standard* for state management.

## Passing Method References Between Components

There are 2 known ways to pass a method to another component

**Anonymous function**

```js
<Component onClick={() => this.handleClick("newValue")} />
```

**`bind` method**

```js
<Component onClick={this.handleClick.bind(this, "newValue")} />
```

**Pro tip**: The anonymous function pattern is actually inefficient. It sometimes triggers unnecessary re-renders. `bind` is better.

## Styling Components

There are 2 ways to styles your components:

1. Stylesheet
  * Add `className` to component
  * Style class using `.css` stylesheet
  * Import `.css` file into component

**Note**: Import basically makes Webpack aware of the `.css` file, which will include a link to it in the HTML

```
// Component
<Component className="component" />

// Stylesheet
.component {
  margin: 0 auto;
}

// Import
import "./component.css";
```

2. Inline styling
  * Create a JS `style` object variable
  * Pass `style` object into `style` JSX attribute of component

**Note**: Inline styles don't have access to all CSS features (e.g. `:hover`).

```js
render() {
  const style = {
    backgroundColor: "white"
  };

  return (
    <Component style={style} />
  );
};
```