---
title: 'Recursion'
part: 8
date: '2020-11-05'
categories: [compsci]
tags: [js]
source: [frontend masters]
---

# Recursion

Recursion is sometimes more confusing because it's actually more **declarative**. You don't see exactly how everything works.

Recursion usually works by breaking down the problem into smaller pieces and adding together the small solutions. As long as you can understand the solution to the simple problem and how those solutions can be combined together, then that's enough.

## Base Condition Location

It's most common to make your base condition return nothing. However, the problem with this is that the last function call in the stack feels like a waste.

For example, in a `countVowels` recursion, you don't need to return an empty string count.

```js
function countVowels(str) {
  if (str.length === 0) return 0;
  const first = isVowel(str[0]) ? 1 : 0;
  return first + countVowels(str.slice(1));
}
```

A performance optimization would be to have your base condition do more of a _lookahead_ to check if the function call is worth making again.

```js
function countVowels(str) {
  const first = isVowel(str[0]) ? 1 : 0;
  if (str.length <= 1) return first;
  return first + countVowels(str.slice(1));
}
```

## Stack Frames & Memory Limits

A serious limitation with recursion being used in production applications is that it creates too many stack frames, making it too memory-intensive.

### Tail call optimization

To address the problem of stack frames taking up too much memory, some compilers employ **tail call optimization**.

The basic idea is this: if the last operation in the function is the same recursive function (a tail call), then we know there is nothing left to do in the current function. Therefore, we can drop it and maintain `O(1)` constant memory space.

### Proper tail calls

The good news is that ES6 now supports **proper tail calls**. There are a few criteria that must be met for a tail call to be proper:

1. Strict mode must be on: `"use strict"`
2. The tail call must happen in the `return` statement, and it should return the return value of the tail call

### Refactoring into proper tail call form

Recall the `countVowels` function. It is not in proper tail call form because it has a `+` operation _after_ the function call.

```js
function countVowels(str) {
  const first = isVowel(str[0]) ? 1 : 0;
  if (str.length <= 1) return first;
  return first + countVowels(str.slice(1));
}
```

The key consideration is that currently the count of the vowels is being stored across the stack frames. Where else can you keep track of the count?

You can track it in an _argument_ of the function (i.e. passing it onto the next stack frame).

```js
function countVowels(count, str) {
  count += isVowel(str[0]) ? 1 : 0;
  if (str.length <= 1) return count;
  return countVowels(count, str.slice(1));
}

countVowels(0, 'Text to count for vowels');
```

The trouble with this solution though is that it's a bit of a _leaky abstraction_. Why do we have to pass `0` as the initial value? Shouldn't the function be taking care of that part?

To hide `0`, we can **curry** it as the first specified argument.

```js
const countVowels = curry(2, function (count, str) {
  count += isVowel(str[0]) ? 1 : 0;
  if (str.length <= 1) return count;
  return countVowels(count, str.slice(1));
})(0);

countVowels('Text to count for vowels');
```

## Alternatives to Tail Calls

What do we do if our compiler doesn't support tail call optimization?

There are at least 2 techniques worth learning to improve recursion:

1. Continuation-passing style
2. Trampolines

### Continuation-passing style

**Continuation-passing style** is the style of passing a _callback_. By doing this, you can somehow _defer_ loading the stack. Instead, the memory usage goes to the heap.

Here's how continuation-passing style looks:

```js
function countVowel(str, cont = v => v) {
  const first = isVowel(str[0]) ? 1 : 0;
  if (str.length <= 1) return cont(first);
  return countVowels(str.slice(1), function (v) {
    return cont(first + v);
  });
}
```

Roughly, what the code is doing is _deferring_ the work of computing the count until you hit the base case. At that point, _all_ the computation happens at once.

### Trampolines

**Trampolines** are adapter functions to help you achieve `O(1)` memory space. The basic idea is this: instead of making the recursive function call, trampolilnes _return_ a function that will make the next call.

```js
function trampoline(fn) {
  return function trampolined(...args) {
    let result = fn(...args);
    while (typeof result === 'function') {
      result = result();
    }
    return result;
  };
}
```

In rough pseudocode:

1. Call the function.
2. While the function continues returning a function, call those functions.
3. Once the return value is not a function, return the return value.

When refactoring your recursive function, the _only_ thing you have to do is wrap your recursive call in a function:

```js
let countVowels = trampoline(function (count, str) {
  count += isVowel(str[0]) ? 1 : 0;
  if (str.length <= 1) return count;
  return function () {
    return countVowels(count, str.slice(1));
  };
});

// Optional
countVowels = curry(2, countVowels)(0);
```

**Note**: The reason the returned function can retain memory of the information we need (`count` and `str`) is because of closure. It doesn't need ever-increasing stack frames.

**Important**: One huge benefit of trampolines is that it is very easy to refactor for proper tail calls (whenever that becomes fully supported).
