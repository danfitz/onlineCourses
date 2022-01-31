---
title: 'Point-free'
part: 4
date: '2020-11-02'
categories: [compsci]
tags: [js]
source: [frontend masters]
---

# Point-free

_Fixed-point_ functions are where you take one of the function's inputs and fix it at a certain value. As a result, if you were to graph that input along an axis, it would always be fixed in one position. Kind of like this:

```js
function multiply(x, y) {
  x = 3;
  return x * y;
}
```

In contrast, **point-free** functions are functions where you don't need to define its _points_, i.e., inputs.

## Point-free via equational reasoning

Imagine a function that takes a callback, where that callback calls another function:

```js
getPerson(function onPerson(person) {
  return renderPerson(person);
});
```

Notice that `onPerson` and `renderPerson` always accept the same inputs and return the same outputs. They have the _same shape_.

As a result, they are **interchangeable**, so we can replace `onPerson` with `renderPerson` directly. (**Note**: If you've reasoned like this, it's called **equational reasoning**.)

```js
getPerson(renderPerson);
```

**Important**: The key takeaway is that `renderPerson` is _point-free_. You don't have to explicitly include the `person` point.

## Point-free refactor

Take the following function relationship:

```js
function isOdd(num) {
  return num % 2 === 1;
}

function isEven(num) {
  return !isOdd(num);
}
```

This is pretty good code; it shows the negation relationship between `isOdd` and `isEven`.

But by using an _adapter function_, we can refactor `isEven` to be _point-free_.

```js
// This adapter function is formally called a "complement"
function not(fn) {
  return function negated(...args) {
    return !fn(...args);
  };
}

function isOdd(num) {
  return num % 2 === 1;
}

// Generates the complement of isOdd
const isEven = not(isOdd);
```

### Value of the refactor

In the original implementation, `isEven` had unnecessary _imperative_ details. Specifically, we didn't need to know that `num` was accepted as a parameter and passed to `isOdd` as an argument.

By using a `not` adapter function and removing the need for the `num` point, we free up the reader to see the negation relationship between `isOdd` and `isEven` _even more clearly_.

We are effectively moving towards a more _declarative_ style.

**Note**: Often times, declarative programming is clearer by being _more implicit_. Declarative code says a lot without needing to literally say it.

## Advanced Point-free Techniques

We can refactor `isOdd` to be point-free as well! We just need adapter functions for _modulus_ and _strict equality_.

```js
function mod(y) {
  return function forX(x) {
    return x % y;
  };
}

function eq(y) {
  return function forX(x) {
    return x === y;
  };
}

const mod2 = mod(2);
const eq1 = eq(1);

function isOdd(num) {
  return eq1(mod2(num));
}
```

(**Note**: Notice how in our currying functions, `mod` and `eq`, we pass y first. This is on purpose. Generally, our code is more _ergonomic_ and _usable_ when we pass y first.)

Now `isOdd` is defined in terms of `mod` and `eq`, where the return value of `mod2` becomes the argument for `eq1`. This pattern is known as **composition**.

We can therefore refactor once more to use a `compose` adapter function.

```js
function compose(fn2, fn1) {
  return function composed(x) {
    return fn2(fn1(x));
  };
}

const isOdd = compose(eq(1), mod(2));
```

**Note**: Using equational reasoning, we swap `eq1` with `eq(1)` and `mod2` with `mod(2)`.
