---
title: 'Searching Algorithms'
part: 6
date: '2020-01-12'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

# Searching Algorithms

1. What is a searching algorithm?
2. Linear search implemented on arrays
3. Binary search on sorted arrays
4. Naive string searching algorithm
5. KMP string searching algorithm

Searching algorithms are basically techniques to look through a set of data and find the items that match certain conditions.

## Linear Search

**Linear search** is the **naive** approach: you look at *every item* in a set of data and check each item to see if it's what you want.

Built-in JavaScript array methods like `findIndex` and `includes` use linear search.

### Time complexity

In the best case, the item you want is at the beginning of your data set, making linear search `O(1)`. In the worst case, it's at the end, making linear search `O(n)`.

You might think that, averaged out, that would make its time complexity `O(n/2)`. However, we always drop constants, so really it's `O(n)`.

## Binary Search

**Binary search** is a method of searching through **sorted** data specifically. (It doesn't work if the data isn't sorted.) Binary search uses a mix of **divide and conquer* and *sliding windows* patterns.

Details about it can be found in the [problem-solving patterns notes](4-problem-solving-patterns.md#divide-and-conquer-pattern).

## Naive String Searching Algorithm

## KMP String Searching Algorithm