---
title: 'Building Functionality with Classes'
part: 8
date: '2021-03-29'
categories: [frontend]
tags: [react, js, ts]
source: [udemy]
---

# Building Functionality with Classes

## Access Modifiers

TypeScript gives you the ability to apply access modifiers to your class's properties or methods:

- `public`
  - By default, all properties and methods have `public` access: the method and property can be accessed from anywhere any time.
- `private`
  - Can only be called by _other methods_ in that same class
- `protected`
  - Can be called by others methods in the same class _or_ child classes' methods

Please refer to the C# Intermediate notes to learn more!

**Pro tip**: An easy way to initialize fields in your constructor is to use the `public` modifier.

```ts
class Car {
  constructor(public color: string) {}
}

const car = new Car('red');
console.log(car.color); // red
```

## Why Classes Matter

Just like interfaces, in TypeScript, classes are one of the main tools we use to ensure strong code reuse!
