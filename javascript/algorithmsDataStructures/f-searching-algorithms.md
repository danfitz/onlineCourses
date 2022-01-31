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

### Time complexity

In the best case, the item you want is at the beginning of your data set, making binary search `O(1)`.

In the worst *and* average case, the item you want is the final number remaining after you've continually halved your data set. That makes binary search `O(log 2 n)`, where `log 2 n` is the **power** required to reach `n`, i.e., the **number of times** you must multiply 2 against itself in order to get a data set of size `n`.

In other words, **every doubling of the data set adds *one more step***.

**Important**: `O(log n)` algorithms are so good that, given a large enough data set, they're practically just as good as `O(1)`.

## Naive String Searching Algorithm

Sometimes you want to find the number of occurrences of a substring in a string. The naive approach goes like this:

1. Loop over the string's characters.
2. Nested loop over the substring's characters.
3. Check that the current character of the substring matches the current character of the string (incrementing the string's current character for each match).
4. If any of the characters don't match, break out of the nested loop and move onto the next iteration of the main loop.
5. If the entire substring matches, increment a counter.
6. Return count at the end.

Here's the code:

```js
const naiveStringSearch = (str, subStr) => {
  let count = 0
  
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < subStr.length; j++) {
      if (str[i + j] !== subStr[j]) break
      if (j === subStr.length - 1) count++
    }
  }
 
 return count
}
```

## KMP String Searching Algorithm

The content for this algorithm is being remade. Will return to it later.