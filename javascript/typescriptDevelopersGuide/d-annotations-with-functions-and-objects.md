---
title: 'Annotations with Functions and Objects'
part: 4
date: '2021-03-27'
categories: [frontend]
tags: [react, js, ts]
source: [udemy]
---

# Annotations with Functions and Objects

## Annotation and Inference for functions

If you recall, we showed a type annotation with functions:

```ts
const logNumber: (i: number) => void = (i: number) => console.log(number);
```

However, `(i:number) => void` isn't type annotation for a function. It's actually type annotation for a _variable_. Type annotation for a function focuses around the right-hand side of that `=` sign.

**Type annotation for functions** tells TypeScript the arguments' types and the return value type. Here's the syntax:

```ts
const add = (a: number, : number): number => a + b;
```

**Note**: TypeScript cannot tell you if the logic of your function body is accurate. If you return `a - b` by accident, it won't tell you. But if you return `'some string value'`, it will throw an error.

**Type inference for functions** can only infer the return value type. It _cannot_ infer the arguments' types.

**Best practice**: We want to use type annotation for arguments _and_ return values. Even though type inference works for return values, it's not a good idea to use it. That's because we could make a typo, giving us an inaccurate inference.

```ts
// We forgot to type `return`, so the inferred return type is `void`
const subtract = (a: number, b: number) => {
  a - b;
};
```

### `void` and `never`

Some functions don't return anything but instead perform side effects. To type the return value, just use `void`.

```ts
const logger = (message: string): void => console.log(message);
```

On very rare occasions, you may expect a function to _never_ return anything. In this case, you use the `never` type.

```ts
// Errors break out of the function without returning anything
const throwError = (message: string): never => {
  throw new Error(message);
};
```

**Note**: If you expect your function to return a value at least _sometimes_, do not use `never`. Use the return value type.

```ts
const throwError = (message: string): string => {
  if (!message) {
    throw new Error('no message provided');
  }
  return message;
};
```

### Type annotating destructured arguments

Sometimes it's nice to be able to destructure arguments in your functions. To annotate these destructured arguments, just place the destructuring on the left-hand side and the types on the right-hand side:

```ts
const logWeather = ({
  date,
  weather,
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};
```

## Annotation and Inference for Objects

Just like how we annotate a destructured argument in a function, type annotating an object is pretty much the same when it comes to **destructuring an object**.

```ts
const obj = {
  foo: 1,
  bar: 'hello',
};

const { foo, bar }: { foo: number; bar: string } = obj;
```
