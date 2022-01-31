---
title: 'Async'
part: 12
date: '2020-11-14'
categories: [compsci]
tags: [js]
source: [frontend masters]
---

# Async

So far, all of our functional programming has been applied to values that were immediately available to us.

This style of functional programming is **synchronous** and **eager**.

```js
// We can map over the values in a right away
const a = [1, 2, 3];
const b = a.map(v => v * 2);
```

How do we apply functional principles and techniques to **asynchronous programming**?

## Map Lazy & Lazy Array

Imagine you could have a `mapLazy` function that allowed you to asynchronously map over values in an array _as_ new values were added in.

```js
const a = [];
const b = mapLazy(a, v => v * 2);

a.push(1);
a[0]; // 1
b[0]; // 2

a.push(3);
a[1]; // 3
b[1]; // 6
```

What's more: what if you could define a `LazyArray` data structure? It would almost be like you're creating _event listeners_ as you add/remove values from the lazy array.

```js
const a = new LazyArray();

setInterval(() => a.push(Math.random()), 1000);

const b = a.map(v => v * 2);

// forEach would be like an event listener that would trigger
// every time a value was added to a and then propagated to b
b.forEach(console.log);
```

**Importance**: If a `LazyArray` existed, since we know we can apply functional techniques to regular arrays, we could in theory apply them to these lazy arrays as well!

## Observables

Although lazy arrays don't actually exist, **observables** are conceptually the same thing.

An observable involves an **asynchronous flow of data**. Think of like a spreadsheet: you have cell A1 with a value and cell B5 with the formula `=A1 * 2`. If you change A1, B5 changes at the same time because B5 is _mapped_ to A1.

**Note**: Observables fall under the area of _reactive programming_.

## Reactive Programming with Rx.js

Rx.js stands for _reactive extensions_. Here's how you'd listen for changes to an observable. It's practically identical to our fictitious example above:

```js
const a = new Rx.Subject();

setInterval(() => a.next(Math.random()), 1000);

const b = a.map(v => v * 2);

b.subscribe(console.log);
```

**Note**: When you call any method like `map` or `filter` or `reduce` in an observable, it returns another observable. That's how we're able to `subscribe` to the changes to the observable.
