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

const A10 = repeater(count);

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

const A10 = repeater(count);

A10(); // "AAAAAAAAAA"
A10(); // "AAAAAAAAAA"
```

By moving our work into the closed-over variable `str`, we perform all the work upfront, and every invocation of `A10` simply returns the value of `str`.

The downside of eager execution though is that if `A10` is never called, you are performing the work unnecessarily too.
