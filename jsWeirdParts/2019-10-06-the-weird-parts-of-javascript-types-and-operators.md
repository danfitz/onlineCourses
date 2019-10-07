---
categories: [frontend]
tags: [js]
title: "The Weird Parts of JavaScript 3: Types and Operators"
---

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

