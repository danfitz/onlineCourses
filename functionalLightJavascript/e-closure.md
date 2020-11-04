---
title: 'Closure'
part: 5
date: '2020-11-02'
categories: [compsci]
tags: [js]
source: [frontend masters]
---

# Closure

**Closure** is where a function remembers variables around it even when that function is executed elsewhere.

Closure can definitely be used to create pure functions, but not all uses of closure are pure:

```js
function makeCounter() {
  let counter = 0;
  return function increment() {
    return ++counter;
  };
}

const inc = makeCounter();
inc(); // 1
inc(); // 2
inc(); // 3
```

In the example above, `inc` is impure because it returns different outputs every time.

## Lazy vs. Eager Execution

Take the following function with closure:

```js
function repeater(count) {
  return function allAs() {
    return ''.padStart(count, 'A');
  };
}

const A10 = repeater(10);

A10(); // "AAAAAAAAAA"
A10(); // "AAAAAAAAAA"
```

Where is the work of generating the string `"AAAAAAAAAA"` performed? It occurs every time `A10` is invoked.

This is known as **lazy execution**: you defer work until the point at which you need to perform it. The downside of this is that if the function gets called many times, you're performing the work over and over again unnecessarily.

Let's refactor `repeater` to use **eager execution**, where you perform the work at the beginning and never again.

```js
function repeater(count) {
  const str = ''.padStart(count, 'A');
  return function allAs() {
    return str;
  };
}

const A10 = repeater(10);

A10(); // "AAAAAAAAAA"
A10(); // "AAAAAAAAAA"
```

By moving our work into the closed-over variable `str`, we perform all the work upfront, and every invocation of `A10` simply returns the value of `str`.

The downside of eager execution though is that if `A10` is never called, you are performing the work unnecessarily too.

## Memoization

What if there was a happy middle ground between eager and lazy execution? What if you only perform the work once—and only when the work needs to get done?

Here's how we can implement `repeater`:

```js
function repeater(count) {
  let str;
  return function allAs() {
    if (str === undefined) {
      str = ''.padStart(count, 'A');
    }
    return str;
  };
}

const A10 = repeater(10);
```

Now when you invoke `A10`, it will only perform the work the first time and then _cache_ or _store_ the result for the next time the function is invoked. This is known as **memoization**: where you cache the outputs associated to different inputs and then return those stored outputs any time those inputs are passed in again.

However, while `A10` is technically functionally pure because it always returns the same output, you've lost the value of functional programming: the ability to be confident about your code. You have to read the code to _really_ know that the function is pure, making it lose its declarative style.

The solution is to encapsulate the memoization inside a `memoize` utility function:

```js
function repeater(count) {
  return memoize(function allAs() {
    return ''.padStart(count, 'A');
  });
}
```

Behind the scenes, `memoize` is doing something similar to our quick and dirty implementation, but it's now encapsulated inside a utility function—often coming from a well-known library that we can trust. It doesn't have to dirty up our own code.

## Referential Transparency

We now come to the last criterion of a pure function: **referential transparency**.

Referential transparency is where you can replace the function invocation with its return value and _not affect the rest of the program_. In other words, the function invocation and its return value are identical.

There's 2 places this is valuable:

- Some compilers (e.g. Haskell) take advantage of referential transparency and memoize function invocations.
- When you read your code, you can trust that functions with certain inputs always return the same outputs, freeing you up from what you have to think about. It's less to worry about!

## Generalized to Specialized

Take the following **generalized** function:

```js
function ajax(url, data, cb) {
  /* ... */
}

ajax(CUSTOMER_API, { id: 42 }, renderCustomer);
```

To **specialize** our `ajax` function, we can hard-code `CUSTOMER_API` by creating a `getCustomer` function.

```js
function getCustomer(data, cb) {
  return ajax(CUSTOMER_API, data, cb);
}
```

Now `getCustomer` tells us more semantically what our intent is when making the `ajax` call. Even if we use `getCustomer` only once, it just reads better.

We can specialize even more by hard-coding the `data`!

```js
function getCurrentUser(cb) {
  return getCustomer({ id: 42 }, cb);
}
```

**Note**: Notice how we define `getCurrentUser` in terms of `getCustomer` and not `ajax`. We do this because it communicates more clearly the relationship between the 2 functions.

**Pro tip**: As will become clearer later, functional programming libraries expect function parameters to be ordered from **generalized to specific**. That's because if you're going to specialize a function, you'll almost always specialize the general parameter _first_.

## Partial Application & Currying

There are 2 ways to specialize a function:

1. Partial application, and
2. Currying.

### Partial application

**Partial application** is where you take a function, specialize it by pre-setting one or more of its inputs, and then return that pre-set version.

```js
function ajax(url, data, cb) {
  /* ... */
}

const getCustomer = partial(ajax, CUSTOMER_API);
const getCurrentUser = partial(getCustomer, { id: 42 });
```

### Currying

**Currying** is the more common form of specialization. It's where you structure a function into a _sequence of functions_ that each take _one argument_.

```js
function ajax(url) {
  return function getData(data) {
    return function getCb(cb) {
      /* ... */
    };
  };
}

ajax(CUSTOMER_API)({ id: 42 })(renderCustomer);
```

Now we can specialize `ajax` with each successive call.

```js
const getCustomer = ajax(CUSTOMER_API);
const getCurrentUser = getCustomer({ id: 42 });
```

As always, functional programming libraries have a utility function for currying!

```js
const ajax = curry(3, function ajax(url, data, cb) {
  /* ... */
});

const getCustomer = ajax(CUSTOMER_API);
const getCurrentUser = getCustomer({ id: 42 });
```

**Note**: Most of these libraries will use _loose currying_, where you can pass multiple arguments instead of one at a time. This is done merely for convenience.

```js
const getCurrentUser = ajax(CUSTOMER_API, { id: 42 });
```

### Comparing partial application & currying

The crucial difference is that

- Partial application takes some of the inputs now and all the rest later, while
- Currying takes none of the inputs now and then receives them one at a time later.

This makes currying attractive for a few reasons;

- `curry` only needs to be called at the beginning, while `partial` has to be called for each successive specialization.
- `curry` allows functions to become a sequence of **unary** functions, making the shape more attractive.

One benefit of partial application though is that it allows you to retain a shape with multiple inputs. If I have a function that accepts 5 inputs, I could partially apply the first 2 and keep a function that accepts 3 inputs. In contrast, if I curry that same function, I can pre-set the first 2 inputs, but I still have to call the function 3 times before I get to the functionality.

## Changing Function Shape with Currying

Sometimes we want to change the shape of a function before using it. Here's how you might do it naively.

Take the `map` array method. It accepts a callback with one parameter—a unary shape. Suppose, however, that we have an `add` function with a binary shape. In order to get it to fit into `map`, we have to wrap `add` in another function.

```js
function add(x, y) {
  return x + y;
}

[1, 2, 3].map(function addOne(v) {
  return add(1, v);
});
```

Why can't we just pass `add` directly into `map`? That's where currying comes in.

```js
add = curry(add);

[1, 2, 3].map(add(1));
```

By converting `add` into a curried function, we can treat it as unary, allowing it to go nicely into `map`.
