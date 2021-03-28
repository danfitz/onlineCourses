---
title: 'Tuples in TypeScript'
part: 6
date: '2021-03-28'
categories: [frontend]
tags: [react, js, ts]
source: [udemy]
---

# Tuples in TypeScript

## Tuples in Action

A **tuple** is a data structure that represents an item by placing its properties into distinct indices.

So instead of an object,

```ts
const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
};
```

you can represent it as a tuple.

```ts
const drink = ['brown', true, 40];
```

However, JavaScript doesn't natively support tuples. In reality, the code snippet above is just an _array_. That means you can mess with the order.

```ts
const drink = ['brown', true, 40];
drink[2] = 'brown'; // nothing stops us from changing the order!
```

TypeScript gives us the ability to convert our array into a real tuple!

```ts
const drink: [string, boolean, number] = ['brown', true, 40];
drink[2] = 'brown'; // TypeScript will complain here
```

## Why Tuples?

Generally, tuples aren't great for representing a piece of data because the indices aren't meaningful. Most of the time, a piece of data is better represented as an object because it associates values to named keys.

But in any case, it's good to know its existence in TypeScript!
