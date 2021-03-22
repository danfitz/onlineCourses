---
title: "Debugging React Apps"
part: 5
date: "2019-10-31"
categories: [frontend]
tags: [react, js]
source: [udemy]
---

# Debugging React Apps

## Logical Errors and Source Maps

When React builds your code for the browser, it's bundled and very different from your `src` files. However, your browser is often given access to a **source map**, which allows it to reverse engineer back to the `src` files. You can then interact with the code to spot your logical errors.

**Note**: You can access the `src` files in **Sources** in Chrome and **Debugger** in Firefox.

How to use Sources or Debugger to debug logical errors:

1. Read through your code and hypothesize which line of code your logic starts to go wrong.
2. In Sources/Debugger, add a **breakpoint** by clicking on the line number.
3. Interact with the app to trigger that line of code. The code will *pause* at that breakpoint.
4. When you hover over each variable name, the browser will tell you the value. *This* is how you check for logical errors!

```js
const users = [
  { id: 1 },
  { id: 2 }
];

const firstUserIndex = users.findIndex(user => user.userId === 1);
// The logical error is that `userId` doesn't exist
// However, it won't throw an error message because `user.userId` just evaluates to undefined
// SOLUTION: Add a breakpoint to the line to see the underlying values!
```

## Error Boundaries

As of React 16+, you can create **custom error messages** if a component fails to render that *replaces* the component. These are called **error boundaries**.

**Pro tip**: Error boundaries are useful when you can't avoid the potential for an error, but you don't want the error to break the entire app. Instead, you want a custom alternative component to render.

Here's the general structure of an `ErrorBoundary` component:

```js
import React, { Component } from "React";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false, // for conditional rendering
      errorMessage: "" // for storing message
    };
  };

  // This method triggers when error is thrown
  // NOTE: Applies to child elements too!
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      errorMessage: error
    });
  };

  render() {
    // Render custom error-related component if error thrown
    if (this.state.hasError) {
      return <h1>Something went wrong...</h1>;
    // Render CHILDREN of ErrorBoundary
    } else {
      return this.props.children;
    };
  };
};
```

Using `ErrorBoundary`, you then *wrap* it around the component you care about conditionally rendering:

```js
<ErrorBoundary>
  <Component />
</ ErrorBoundary>
```

Now if `Component` runs into an error, `ErrorBoundary` will instead render a custom error-related component.

**How it works**: `ErrorBoundary` listens for when its child components break. When that happens, it simply invokes `componentDidCatch`.