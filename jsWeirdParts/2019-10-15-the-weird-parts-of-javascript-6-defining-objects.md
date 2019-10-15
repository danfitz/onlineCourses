---
categories: [frontend]
tags: [js]
title: "The Weird Parts of JavaScript 6: Defining Objects"
---

## Function Constructors, new, and The History of JavaScript

There are lots of different ways to construct objects. We know object literals already: `{}`. Another way to construct objects is to use **function constructors** and the `new` keyword.

```js
// Function constructor
function Person() {
  this.firstName = "Dan";
  this.lastName = "Fitz";
};

const dan = new Person();
```

The power of the function constructor comes from the `new` keyword, an operator that returns a constructed object. `new` is basically syntactic sugar for a series of steps:

1. `new` creates an empty object `{}`.
2. Then it invokes the function `Person()`.
3. It changes the `this` reference to that empty object it created.
4. Finally, it runs `Person()` with the new `this`.

**Note**: If you place a `return` inside your function constructor, it overrides the default behaviour of `new`!

## Function Constructors and '.prototype'

