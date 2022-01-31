---
title: 'Code Splitting'
part: 2
date: '2020-06-29'
categories: [performance]
tags: [js, browser]
source: [frontend masters]
---

# Code Splitting

## Static vs. Dynamic

You use static code splitting in situations like:

- **Heavy JS**: stuff that is a lot to download, parse, and execute, yet you don’t use it right away
- **Anything temporal**: things like modals, tooltips, etc. that don’t appear right away and aren’t needed right away (conditionally load)
- **Routes**: the only code you need to load is the one related to the current route; every other route can be code split

Dynamic code splitting uses the `import()` function but places a variable inside of it. For example:

```js
const getTheme = themeName => import(`./src/themes/${themeName}`);

form.addEventListener('submit', e => {
  e.preventDefault();
  getTheme(e.target.theme.value).then(module => module.loadTheme());
});
```

**Note**: Technically, all code splitting is _static_ because the directory resolves to a particular path, and webpack creates a unique bundle at build time for that path. It’s only really “dynamic” insofar as changes at runtime can influence what modules are lazily loaded. (In the example above, the dynamic part is the form value.)

## How Code Splitting Works

Suppose you have a component that you only want to render when you click a button. The naive solution would be to do something like this:

```js
import button from './button';
import component from './component';

document.body.appendChild(button);
button.addEventListener('click', e => {
  document.body.appendChild(component);
});
```

However, the problem with this solution is that the `component` module _still_ gets included in the bundle that webpack generates—even though it’s not being used!

Here’s where **code splitting** comes in. Using a dynamic import, we can asynchronously load the module _only_ when we need it:

```js
import button from './button';
const getComponent = () => import('./component');

document.body.appendChild(button);
button.addEventListener('click', e => {
  getComponent().then(componentModule => {
    // dynamic import returns a promise
    document.body.appendChild(componentModule.component);
  });
});
```

Now when we look at the bundle, `component` is not included. What’s more is that if we click the button, we’ll see the `component` module bundle load in the Network tab.

**Note**: If you click the button multiple times, it won’t refetch the `component` module because the module is now in cache!

**Pro tip**: This approach works especially well when loading heavy libraries!

## Webpack Code Splitting Under the Hood

1. Webpack creates a chunk cache and module cache inside `webpackJsonpCallback`.
2. `__webpack_require__.e` grabs the module from the module cache and appends it as a `script` element to the HTML’s `head`.

## Code Splitting in Frameworks

In Vue, code splitting is a first-class citizen. All you have to do is this:

```html
<script>
  // import Component from './component';
  const Component = () => import('./component');
</script>
```

With React, code splitting can be handled using `loadable-components`. This library makes it easy to implement code splitting in React.

## Code Splitting Named Exports

When the `import` function resolves its promise, it will always return the default export.
