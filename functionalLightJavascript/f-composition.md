---
title: 'Composition'
part: 6
date: '2020-11-03'
categories: [compsci]
tags: [js]
source: [frontend masters]
---

# Composition

## Example of Composition

It's common to store function return values into temp variables and then pass that into other functions.

```js
// Calculating the shipping rate
var temp = increment(4);
temp = triple(temp);

const totalCost = basePrice + minus2(temp);
```

You may have manually performed **composition** if you refactored this code to remove the temp variables, instead passing your functions directly as arguments to other functions.

```js
const totalCost = basePrice + minus2(triple(increment(4)));
```

We can improve this code even more though. We can _abstract_ the calculation of the shipping rate into a `shippingRate` function.

```js
function shippingRate(x) {
  return minus2(triple(increment(x)));
}

const totalCost = basePrice + shippingRate(4);
```

**Pro tip**: Abstraction is valuable because it creates a **semantic boundary** around your code. It allows you to reason about some section of your code independently of the rest.

## Declarative Data Flow

In our example, suppose that we need to calculate different kinds of shipping rates: international, national, local, etc.

There is a pattern in each of these shipping rate calculations. They each take in an input and pass them into a bunch of composed functions. The functions themselves may change, but the act of composition remains the same.

So we can create a compose helper function to handle all the different shipping rates:

```js
function composeThree(fn3, fn2, fn1) {
  return function composed(v) {
    return fn3(fn2(fn1(v)));
  };
}

const shippingRate = composeThree(minus2, triple, increment);
const intShippingRate = composeThree(plus5, quadruple, increment);
```

This act of composition is a form of **declarative data flow**. Your shipping rate functions get defined declaratively and point-free, and it's really easy to read that your inputs (the data) get passed from right to left in a series of functions found in `composeThree`.

## Piping vs. Composition
