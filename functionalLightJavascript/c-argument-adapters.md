---
title: 'Argument Adapters'
part: 3
date: '2020-11-01'
categories: [compsci]
tags: [js]
source: [frontend masters]
---

# Argument Adapters

The **shape** of a function is a description of the _number_ and _kind_ of things you pass into a function and the _number_ and _kind_ of things that come out of it.

- A function that takes a single value in and returns a single value is called a **unary** function.
- A function that takes in 2 inputs is called a **binary** function.
- Finally, any function that takes more than 2 inputs is called an **n-ary** function.

The shape of a function matters in functional programming because it affects how functions fit together. Just like lego pieces, you want your functions to have similar shapes, so they can be attached together smoothly.

**Pro tip**: Functional programmers _prefer_ unary functions the most and binary functions second most.

## Shape Adapters

It's possible to create a higher-order function that _adapts_ n-ary functions into unary or binary functions.

```js
// n-ary function
function func(...args) {
  return args;
}

// unary shape adapter
function unary(fn) {
  return function one(arg) {
    return fn(arg);
  };
}

// binary shape adapter
function binary(fn) {
  return function two(arg1, arg2) {
    return fn(arg1, arg2);
  };
}

const unaryFunc = unary(func);
const binaryFunc = binary(func);

unaryFunc(1, 2, 3); // returns [1]
binaryFunc(1, 2, 3); // returns [1, 2]
```

## Flip and Reverse Adapters

Sometimes you need to flip arguments, so you can create a higher-order adapter function to do that:

```js
function func(...args) {
  return args;
}

function flip(fn) {
  return function flipped(arg1, arg2, ...args) {
    return fn(arg2, arg1, ...args);
  };
}

const flippedFunc = flip(func);
flippedFunc(1, 2, 3); // returns [2, 1, 3]
```

A more extreme version of a flip adapter would be a reverse adapter, where you reverse the order of every argument:

```js
function reverse(fn) {
  return function reversed(...args) {
    return fn(...args.reverse());
  };
}
```

## Spread Adapter

Sometimes you want to change the shape of a function where it can take an _array_ of values for all its arguments. In functional programming, that is known as **apply**.

```js
function spreadArgs(fn) {
  return function spread(args) {
    return fn(...args);
  };
}

function func(x, y, z) {
  return x + y + z;
}

const appliedFunc = spreadArgs(func);
appliedFunc([1, 2, 3]); // returns 6
```

**Note**: The inverse, **unapply**, accepts multiple arguments and passes them as an array to the underlying function.
