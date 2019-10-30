---
categories: [frontend]
tags: [react]
title: "React - Complete Guide 4: Styling React Components & Elements"
source: [udemy]
---

**Recall**: We know 2 ways to style components and elements so far.

1. **Inline styling** using `style` object passed into component as `style={style}`
  * Specific to component
  * But can't apply pseudo-selectors like `hover` or media queries
2. **Stylesheet import** using `import ./style.css"` that gets compiled by Webpack
  * Styles will apply globally

**Note**: To add media queries and pseudo-selectors to inline styles, install the popular package **Radium**.
  * For pseudo-selectors, simply wrap your component *inside* `Radium` class when you export component.
  * For media queries, simply wrap your `App` `return` statement with `StyleRoot` component.

## Setting Styles Dynamically

To set inline styles dynamically, you can just update the `style` object!

```js
render() {
  const style = {
    color: blue
  };

  if (this.state.isOff) style.color = "gray";

  return <div style={style}>Hi!</div>;
};
```

To set classes dynamically, just use an array with the `join()` method.

```js
render() {
  const classes = [];

  if (this.state.persons.length < 3) {
    classes.push("red");
    // classes = ["red"]
  };
  if (this.state.persons.length < 2) {
    classes.push("bold");
    // classes = ["red", "bold"]
  };

  return <div className={classes.join(" ")}>Hi!</div>;
};
```