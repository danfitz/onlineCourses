---
title: Strings
part: 9
date: '2022-05-03'
categories:
  - compsci
tags:
  - data structures
  - algorithms
source:
  - algoexpert
---

# Strings

## How Strings are Stored in Memory

Each character in a string is mapped to an integer via some character encoding standard like ASCII or Unicode.

To represent a string in memory, you simply store the integers as an array!

**Note**: The amount of memory for each integer depends on how large the character encoding standard is. ASCII uses only one byte (or one memory slot) per integer because there are only 256 possible characters. Other encoding standards have many more possible characters, so each character may take up multiple bytes to capture all those possibilities. The key point though is that the integers are **fixed-width**.

## Spacetime complexity of operations

* Traversal
  * `O(n)` time since it's just an array
  * `O(1)` space since nothing new is being stored
* Copy
  * `O(n)` time since you have to traverse to copy
  * `O(n)` space since you're adding every element to a new location in memory
* Get
  * `O(1)` time since accessing a character at an index is trivial
  * `O(1)` space since nothing new is being stored

## Spacetime complexity of mutations

In some languages like C++, you can add, remove, or change characters in a string.

In many other languages like JavaScript or Python or Java, strings are **immutable**.

But then how can we perform operations like this?

```js
const str = "Hello";
str += "!";
```

It turns out in these languages that when you "mutate" a string, you're actually just **creating a brand new string under the hood**.

The time complexity ramification of this is that for immutable strings, adding, removing, or changing characters is generally `O(n)`.

For example, to combine `"Hello"` and `"!"`, you have to traverse all six elements and copy them all to a brand new location in memory.

### How to efficiently "mutate" immutable strings

If you plan to change a lot of characters in a string, the naive approach would mean that every operation you perform is  `O(n)`.

To bypass this problem, the recommended approach is the following:

1. Split the string into an *array of characters*
   * This is an `O(n)` operation since you're traversing through every character
2. Perform a bunch of `O(1)` operations on the array of characters
3. Rejoin the array of characters into your new string
   * This is an `O(n)` operation since you're traversing through every character

With this approach, you're only performing two `O(n)` operations while the rest are `O(1)`.