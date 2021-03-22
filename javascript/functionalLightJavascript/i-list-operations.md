---
title: 'List Operations'
part: 9
date: '2020-11-06'
categories: [compsci]
tags: [js]
source: [frontend masters]
---

# List Operations

## Map, Filter, Reduce

Array methods like `map`, `filter`, and `reduce` are generalized operations that, in principle, could be performed on many other data structures.

When you can apply an operation across items inside of a collection, we call that collection a **functor** (like arrays).

### A note about list operations as methods

JavaScript's built-in array methods are technically **impure**. They depend on an implicit input: the `this` keyword. Because of the implicitness, you can't do cool functional programming techniques like currying or composition.

Because of this problem, functional programming libraries usually give you these operations with the data structures passed as _explicit_ inputs.

### Map: transformation

`map` is fundamentally a **transformation** operation: you take items inside of some collection and perform conversions on each of them.

**Note**: The transformation can't mutate the collection. It has to create a new instance of the data structure with the transformed items inside.

**Pro tips**: The operation that is performed in your `map` should ideally only do one thing. In other words, don't make it _polymorphic_ (i.e., do different things depending on the input).

### Filter: inclusion

`filter` is an **inclusionary** activity.

### Reduce: combination

`reduce` **combines** items into your collection starting with some initial value. (If an initial value isn't provided, some `reduce` functions use the first item as the initial value.)

**Note**: Unlike `map` and `filter`, which are unary, `reduce` is _binary_. In fact, any function with 2 parameters can be thought of as a reducer.

### Composition with Reduce

Arrays come with a built-in `reduceRight` method where you reduce a list of items from right to left.

This function could be used for _composition_ because composition occurs from right to left.

```js
function compose(...fns) {
  return function composed(v) {
    return fns.reduceRight(function (val, fn) {
      return fn(val);
    }, v);
  };
}

const f = compose(div3, mul2, add1);
```

`reduceRight` works with composition because every function invocation is a reduction. Then you pass each reduction as the argument for the next function!

## Fusion

It's common (and really a good thing) to chain your list operations, so it's clear what you're doing at each step.

```js
nums.map(increment).map(multiply2).map(decrement);
```

There's 2 issues with this chaining approach:

- **Performance**: You're looping through the array with each chained method, making it a performance risk.
- **Imperative**: In order to understand how the data is changing, you have to read through it line by line.

**Solution**: To make our code more performant and more declarative, we can _compose_ our callbacks. This is called **fusion**.

```js
nums.map(compose(decrement, multiply2, increment));
```
