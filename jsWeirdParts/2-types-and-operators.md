---
title: 'Types and Operators'
part: 2
date: '2019-10-06'
categories: [frontend]
tags: [js]
source: [udemy]
---

# Types and Operators

## Conceptual Aside: Types and JavaScript

**Dynamic typing** is the idea that the JavaScript engine figures out what type of data that a variable holds *while your code is running*.

This allows you to change the data type as the code is running, and the engine will figure out the data type automatically.

(Contrast this to **static typing**, where you tell the compiler the data type you intend to hold inside a variable ahead of time.)

## Primitive Types

**Primitive types** are data types that represent a **single value**, i.e., is not an object or collection of name/value pairs.

1. `undefined`: stands for lack of existence (set by JS engine when variable isn't assigned)
2. `null`: also stands for lack of existence, but it's something you can set!
3. `Boolean`
4. `Number`: it's a **floating point** number, so it always has decimals! (This can make math weird.)
5. `String`
6. `Symbol`

## Conceptual Aside: Operators

**Operators** are actually syntactic sugar for functions that take 2 arguments and return 1 result.

Operators are functions with **infix notation** (operator is between the 2 values).

## Operator Precedence and Associativity

**Operator precedence** is about which operator function gets called first. Higher precedence always wins.

**Operator associativity** refers to the order that operator functions get called *when they have the same precedence*. This can be left-to-right or right-to-left.

Example of precedence:

```js
var a = 3 + 4 * 5;
console.log(a);
```

`*` has a higher precedence than `+`, so `*` operator function gets run first.

Example of associativity:

```js
var a = 2, b = 3, c = 4;

a = b = c;
```

Every variable will be `4` because the assignment operator has right-to-left associativity!

**Pro tip**: Remember how assigning a variable in the browser console returns the value assigned? That's because it's a function taking 2 values and returning a result! In the example above, `b = c` returns 4, which evaluates to `a = 4`!

## Conceptual Aside: Coercion

**Coercion** is converting a value from one type to another. This happens in JavaScript often because it's dynamically typed.

```js
var a = 1 + "2";
```

The JavaScript engine coerces `1` into a string because it's trying to dynamically type the data *for you* in order to complete the operation.

## Comparison Operators

Everything we learnt so far comes together here.

```js
console.log(1 < 2 < 3); // returns true
console.log(3 < 2 < 1): // also returns true
```

The first line above makes sense, but the second line seems wrong. What's going on with the second line?

Recall that the `>` operator above is used across the board, so we're dealing with an associativity problem.

`>` operator has a left-to-right associativity. Therefore, `3 < 2` evaluates to `false`.

`false < 1` then leads to coercion. When you coerce `false` into a number, it becomes `0`. And we know that `0 < 1` is `true`!

**Pro tip**: To check what a value coerces into when pushed into another data type, use the class constructor for that data type. For example, `Number(false)` will coerce `false` into `0`.

**Note**: Even `1 < 2 < 3` is not evaluating to `true` for the reasons you expect. It works only because of coercion as well.

### Strict equality operator

The equality operator only checks for equality of value (and not type) because it utilizes coercion!

So `"3" == 3` will coerce `3` into string, which is why it returns `true`.

On the other hand, the **strict equality operator** prevents coercion, which is why it only evaluates to `true` when the values compared are of the same value *and* type.

**Pro tip**: The equality operator is weird in that it doesn't behave as expected. For example, `null == 0 ` returns `false` even though `null` can be coerced into `0`. That's why it's best practice to use the strict equality operator to avoid these issues.

## Existence and Booleans

If you've ever used existence in an `if` statement, that works because of **coercion** as well!

```js
var a = "I exist!";

if (a) {
  // run code
};
```

`a` gets coerced into a boolean!

**Pro tip**: Be careful with the number `0`, as it coerces to `false`, but you may not always want it to be treated as `false`.

## Default Values

Unlike many programming languages, JavaScript doesn't care if you fail to provide an argument for a function. 

That's because when a function is invoked, it creates an execution context that automatically places the parameter into memory space as `undefined`.

```js
function greet(name) {
  console.log("Hello " + name);
};

greet(); // logs "Hello undefined"
```

What if you want to set a default value for parameters like `name`? Here's a neat trick:

```js
function greet(name) {
  name = name || "Default name";
  console.log("Hello " + name);
};
```

The or `||` operator has a special behaviour where if it has two values that can be coerced to a boolean, it will return the first value that can be coerced to `true`.

If `name` is `undefined`, it will return `"Default name"` because that's the only value that can be coerced to `true`. If `name` has a value, it will return that value instead!

Similar cases: `0 || 1` will return `1`. `"Hello" || ""` will return `"Hello"`.

## Framework Aside: Default Values

The or `||` operator trick is used by libraries often.

Suppose you have 3 JS files that you import into your `index.html`.

```html
<script src="lib1.js">
<script src="lib2.js">
<script src="app.js">
```

Suppose that these JS files have the following lines of code:

```js
// In lib1.js
var libraryName = "Lib 1";

// In lib2.js
var libraryName = "Lib 2";

// In app.js
console.log(libraryName);
```

When you load multiple JS files, it's all under one execution context. Each file just stacks one on top of the other.

That means that `libraryName` will console log `"Lib 2"`. This is a problem for frameworks/libraries because you don't want to collide with other code.

### Solution

Frameworks/libraries will do this to avoid collision of other code:

```js
window.libraryName = window.libraryName || "Lib 2";
```

Essentially, many frameworks/libraries will first check to see if the variable name for the library is already taken in the global object. If it's not, `"Lib 2"` will be stored in the variable.

Often times, `"Lib 2"` is basically the entire framework/library in a namespace!

So, if a conflict occurs, the framework/library just won't load, which is helpful for debugging!