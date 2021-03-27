---
title: 'Type Annotations in Action'
part: 3
date: '2021-03-27'
categories: [frontend]
tags: [react, js, ts]
source: [udemy]
---

# Type Annotations in Action

## Type Annotations and Type Inference

A **type annotation** is an _explicit_ bit of code that tells TypeScript what type of value some variable refers to.

In contrast, **type inference** tries to figure out the type for that variable _for you_.

The question for the developer is: **when should you explicitly type a variable using type annotation, and when should you rely on type inference**?

## Type Annotations

### Annotating variables

To type annotate a _variable_, just do this:

```ts
// Primitive types
const apples: number = 5;
const hasName: boolean = true;
```

### Annotating objects

To annotate more complex object types, just do this:

```ts
// Class
const date: Date = new Date();
// Array
const colors: string[] = ['red', 'green', 'blue'];
// Object literal (for properties)
const point: { x: number; y: number } = { x: 10, y: 20 };
```

### Annotating functions

To annotate a _function_, just do this:

```ts
const logNumber: (i: number) => void = (i: number) => {
  console.log(i);
};
```

**Note**: `(i: number) => void` is the syntax for type annotating a function. The left-hand side tells TypeScript the types for the arguments, while the right-hand side tells TypeScript the type for the return value.

## Understanding Type Inference

Take the following type annotation:

```ts
let apples: number = 5;
```

What happens if you remove the type annotation?

```ts
let apples = 5;
```

You will find that TypeScript _still_ types `apples` as `number`. This is an example of **type inference**.

**Note**: Type inference only works if _variable declaration and initialization_ happen on the same line. So, if I do it on a separate line, TypeScript won't automatically infer the type for us:

```ts
let apples;
apples = 5; // `apples` will be of type `any`
```

## When to Use Type Annotations vs. Type Inference

In general, we want to try to use _type inference_. That's because it means less code to write.

However, there are at least 3 situations when you need to use type annotations:

1. When a function returns the `any` type, and we need to clarify the value
2. When you declare a variable on one line and _delay_ initialization for another line
3. When you want a variable to have a type that _can't be inferred_

### Functions that returns the `any` type

The `any` type is a type that tells TypeScript that we have no idea what type the variable is.

Some functions that depend on the input to determine the return type will return the `any` type because it can't reasonably predict the return type.

For example, `JSON.parse` could return any number of types depending on the JSON string you input. If you pass "'false'", you get back a boolean. If you pass `'5'`, you get back a number.

However, allowing `JSON.parse` to return the `any` type wastes the potential of TypeScript. If you don't type your variables, you can't get helpful error messages if you do something wrong.

```ts
// infers the `any` type
const age = JSON.parse('25');
// no error message for this fake property
age.notRealProperty;
```

To solve this, we explicitly include a _type annotation_:

```ts
const age: number = JSON.parse('25');
age.notRealProperty; // now TypeScript will complain
```

### Delayed initialization

When you delay initialization, type inference doesn't work, and your variable is assigned the `any` type.

```ts
let target; // `any` type
if (isAvailable) {
  target = 'Ready to use';
} else {
  target = 'Not ready';
}
```

Similar to the function case above, this is bad practice in TypeScript.

To solve this problem, we just apply type annotation.

```ts
let target: string;
if (isAvailable) {
  target = 'Ready to use';
} else {
  target = 'Not ready';
}
```

### When inference doesn't work

Type inference breaks down when the variable's type can be more than one type.

A real-world case of this might be you're storing a user's `favouriteMedia`, and that variable could receive either a `Book` instance, `Movie` instance, or `Song` instance.

To solve this, you can use the `|` operator, which is sort of like an or operator for your types.

Since type inference doesn't support multiple types, you _must_ type annotate to use the `|` operator.

```ts
const media = [
  new Book({ rating: 90 }),
  new Movie({ rating: 98 }),
  new Song({ rating: 10 }),
];

let favouriteMedia: Book | Movie | Song;

media.forEach(item => {
  if (item.rating > 95) {
    favouriteMedia = item;
  }
});
```
