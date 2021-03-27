---
title: 'What is a Type System?'
part: 2
date: '2021-03-26'
categories: [frontend]
tags: [react, js, ts]
source: [udemy]
---

# What is a Type System?

This course breaks our learning into 2 parts:

- Syntax + features of TypeScript
  - What is an interface? What is the syntax for defining one?
- Design patterns with TypeScript
  - How do we use interfaces to write reusable code?

## Types

Think of a **type** as a shorthand name that denotes all the properties and methods that a value has.

For example, if I say the value `"red"` is a string, I'm telling you that it has properties like `length` or methods like `trim()`.

Similarly, in TypeScript, if I assigned an interface to an object, I'm telling TypeScript about that object's _type_ and therefore its properties and methods!

```ts
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get('/todos/1').then(response => {
  const todo = response.data as Todo;
});
```

### Categories of types

There are 2 major categories of types in TypeScript:

1. **Primitive types**: numbers, booleans, strings, null, undefined
2. **Object types**: functions, classes, arrays, objects

**Pro tip**: You'll see later on that this distinction is helpful because object types can be used to trick TypeScript into believing some value is an object type.
