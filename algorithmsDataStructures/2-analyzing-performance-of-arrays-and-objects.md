---
title: 'Analyzing Performance of Arrays and Objects'
part: 2
date: '2019-12-07'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

# Analyzing Performance of Arrays and Objects

## Objectives

* Understand how objects and arrays work through the lens of big O
* Explain why adding elements to the beginning of an array is costly
* Compare and contrast the runtime for arrays, objects, and their built-in methods

## The Big O of Objects

Objects don't have order, but they are great for manipulating and accessing data inside them *very fast*:
* Insertion is `O(1)`
* Removal is `O(1)`
* Access/retrieval is `O(1)`
* Searching through an object is `O(n)`

### Object methods

* `Object.keys` is `O(n)` because it has to search through all keys and store them in an array
* `Object.values` is `O(n)` for the same reason
* `Object.entires` is `O(n)` for the same reason too
* `Object.hasOwnProperty` is `O(1)` because it's just checking 1 key

## The Big O of Arrays

Arrays have order and fast access, but sometimes insertion and removal of data is expensive.
* Access/retrieval is `O(1)`
* Searching through an array is `O(n)`
* Insertion varies
* Removal varies

### Insertion and removal

Adding or removing an element from the **end** of an array is `O(1)`. It's kind of like adding a key/value pair to an object.

However, adding or removing from the **beginning** of an array is `O(n)`. That's because every element in the array *after the first* has to be **re-indexed** to maintain the order.

**Pro tip**: Avoid adding or removing from the beginning of an array. It's expensive. Only do it when you need it.

### Array methods

* `push` and `pop` are `O(1)` because it's like a key/value pair assignment
* `shift` and `unshift` are `O(n)` because they require re-indexing
* `concat` is `O(n)` because you have to go through all elements in the arrays to get back the concatenated copy
* `slice` is `O(n)` because the number of elements you're slicing is the number you have to go through
* `splice` is `O(n)` because, in the worst case, you're basically adding to the beginning of an array and re-indexing everything after it
* `sort` is `O(n * log n)` because it has to perform comparisons, which makes it more complicated than just a linear `O(n)`
* Finally, `forEach`, `reduce`, `map`, `filter`, etc. are all `O(n)` because you're iterating through each element once.