---
title: "Styling React Components"
part: 4
date: "2019-10-29"
categories: [frontend]
tags: [react, js]
source: [udemy]
---

# 4 - Styling React Components

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

## Scoping Styles with CSS Modules

**CSS modules** allow you to scope styles in a `*.module.css` file to a specific component, *even if* those styles would override other stylesheets (e.g. using same class name).

As of `react-scripts@2.0.0` and higher, CSS modules are supported. To make them work in prior versions, you need to manually configure the Webpack config:

1. `npm run eject` to remove `react-scripts` and give you full access to Webpack config (as opposed to `react-scripts` managing it for you).
2. Update `webpack.config.dev.js` and `webpack.config.prod.js` files in new `config` folder to turn on CSS modules.
  * **Note**: This works because you're telling Webpack how to bundle the CSS
3. In the `Component.js` file, `import classes from "./Component.css"` to get access to a `classes` object.
4. Go to the appropriate element in the `return` statement and add `className={classes.className}` (where `className` is found in your `Component.css` file).

CSS modules scope your CSS because when Webpack bundles your files, it takes your class names and appends component names and unique hashes like `[name]__[local]__[hash]`. Then it exposes a JS object that **maps** your class names to their appended versions using key/value pairs of the form `className: [name]__[local]__[hash]`. You then use this object in your component.

**Pro tip**: To make a CSS class global, append `:global .class { ... }`.

### Targeting child elements

A component always returns one element with child elements all inside. To target child elements, you can just use this CSS selector syntax: `.Parent child`. `.Parent` will be converted into a unique class name, so `child` will be uniquely targeted!

**Note**: You can also just give your child elements their own class.

```css
.App { ... }

.App button { /* <-- targets buttons inside .App */
  color: red;
}
```

### Using pseudo-selectors

Simple. Just add the pseudo-selector to selector that includes a class. The class will be converted:

```css
.App button:hover { ... }
```

### Using media queries

Simple again. Just make sure style rules inside your media query make use of classes.

```css
@media (min-width: 480px) {
  .App { ... }
}
```