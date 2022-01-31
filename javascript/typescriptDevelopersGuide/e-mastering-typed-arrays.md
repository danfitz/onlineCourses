---
title: 'Mastering Typed Arrays'
part: 5
date: '2021-03-28'
categories: [frontend]
tags: [react, js, ts]
source: [udemy]
---

# Mastering Typed Arrays

**Typed arrays** are arrays where each element is some _consistent type_.

## Annotation and Inference

In most cases, we can rely on type inference for typing arrays.

```ts
// TypeScript reads the contents of this array and infers the type
const carMakers = ['Ford', 'Toyota'];
```

However, if we initialize an empty array that will receive content _later_, we need to type annotate explicitly.

```ts
const carMakers: string[] = [];

// Logic to add car makers here...
```

### Annotating two-dimensional arrays

When you have two-dimensional (or multi-dimensional) arrays, you just append multiple levels to the type.

```ts
const carsByMake: string[][] = [['F150'], ['Corolla'], ['Camaro']];
```

The first `string[]` denotes the inner array. The second `[]` denotes the outer array.

## Why Typed Arrays Matter

1. TypeScript can infer types when extracting values from a typed array.

```ts
const carMakers: string[] = ['Ford', 'Toyota'];

// TypeScript knows these variables will be a string
const firstCar = carMakers[0];
const lastCar = carMakers.pop();
```

2. Typed arrays prevent incompatible values from being _added_.

```ts
const carMakers: string[] = ['Ford', 'Toyota'];

carMakers.push(1); // not accepted
```

3. When we use array methods like `map` or `reduce`, TypeScript tells us the properties and methods of the current item in the callback because it knows the type.

## Multiple Types in Arrays

To support multiple types in arrays, just use the `|` operator:

```ts
const importantDates: (string | Date)[] = [];
importantDates.push(new Date());
importantDates.push('2030-10-10');
importantDates.push(100); // fails
```
