---
title: 'Static Analysis Testing'
part: 2
date: '2020-04-28'
categories: [tools]
tags: [js, testing]
source: [egghead]
---

# Static Analysis Testing

This section focuses on the tools that help you eliminate bugs related to typos and incorrect types (e.g. providing a string to a function that expects a number).

## Linting with ESLint

**Linting** is the process of analyzing code to flag errors, bugs, stylistic problems, and suspicious constructs. The basic idea to set up `eslint` in particular is to

1. `npm install --save-dev eslint`.
2. In the root directory, include `.eslintrc` with all your configuration.
3. Follow the [docs](https://eslint.org/docs/user-guide/getting-started) to see what you can configure.
4. Run `npx eslint .` to analyze your code.

Here's a sample of what you can configure:

```json
{
  // Tells eslint the type of JavaScript being parsed
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  // This is where the cool configuration happens
  "rules": {
    "strict": ["error", "never"], // doesn't allow explicit use of 'use strict'
    "valid-typeof": "error", // doesn't allow invalid comparisons/typos like typeof 'hello' === 'strng'
    "no-unsafe-negation": "error", // doesn't unclear negations like !key in object instead of !(key in object)
    "no-unused-vars": "error", // self-explanatory
    "no-unexpected-multiline": "error", // doesn't allow extra lines
    "no-undef": "error" // doesn't allow using undeclared/undefined variables
  },
  // Tells eslint expected environment, so it can handle environment specifics
  // Example: `console` is usually an undeclared variable, but it's not in a browser
  "env": {
    "browser": true
  }
}
```

**Pro tip**: The key options for rules are `error`, `warn`, and `off`.

* Use `error` when you want to stop your build altogether. This is good for catching essential errors that you can't allow.
* Use `warn` when you're willing to allow some issues to pass by without disturbing your build. This is useful when you want to give a recommendation or your team is transitioning into eslint.
* Use `off` when you don't need any errors or warnings at all.

### ESLint in VS Code

If you want to catch common ESLint issues in your code editor, you can download `eslint` in VS Code.

This will automatically underline issues for you. You can even run `ctrl + .` or `cmd + .` when hovered you're on top of the error to tell the extension to fix the issue for you.

**Pro tip**: When you run `ctrl + .`, you can also tell ESLint to ignore your issue. This will include an ignore code comment above the issue that ESLint will acknowledge. Example:

```js
// eslint-disable-next-line valid-typeof
typeof name === 'strng'
```

**Note**: Another option is to run `npx eslint . --fix`. ESLint will fix as many issues as it can this way.