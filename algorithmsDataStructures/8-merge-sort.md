---
title: 'Merge Sort'
part: 8
date: '2020-03-13'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

The more basic bubble, selection, and insertion sorts are great at smaller data sets. However, because they're quadratic `O(n^2)`, they fail badly at huge data sets.

By comparison, the more advanced **merge, quick, and radix sorts** can improve time complexity up to `O(n log n)`.

# Merge Sort

**Merge sort** is a combination of 3 actions: **splitting up**, **sorting**, and **merging**.

Merge sort exploits the fact that arrays of 0 or 1 elements are *automatically* sorted: `[]` and `[1]`. (Insertion sort also exploits this in the beginning.)

Here's a rough outline of how it works:

1. **Splitting up**: In a *divide and conquer pattern*, an array is continually split up into smaller and smaller subarrays until you get a bunch of *empty arrays* or *arrays with 1 element*. By default, these arrays are sorted.
2. **Sort and merging**: Sorted subarrays are merged into larger sorted subarrays, and then *those* sorted subarrays are merged and sorted.

```js
mergeSort([1, 5, 3, 2, 6, 8])
// SPLIT: continually break down array into subarrays
// [[1, 5, 3], [2, 6, 8]]
// [[1], [5, 3], [2], [6, 8]]
// [[1], [5], [3], [2], [6], [8]]

// MERGE AND SORT: re-merge subarrays into larger and larger sorted arrays
// [[1, 5], [2, 3], [6, 8]]
// [[1, 2, 3, 5], [6, 8]]
// [1, 2, 3, 5, 6, 8]
```

## Merging Subarrays

The magic of merge sort is in the **merging** of sorted arrays.

The pseudocode for merging already sorted arrays goes like this:

1. Create a new array.
2. Check the first value of both sorted input arrays. Insert the smaller value into the new array and move onto the next item for that input array.
3. Continue to do this until both input arrays reach their last item.
4. If one input array reaches its last item before the other, the remaining input array should just dump all its values to the end of the new array--because we know those values will be larger!

The code implementation goes something like this:

```js
const merge = (arr1, arr2) => {
  const arr =[]
  let pointer1 = 0
  let pointer2 = 0

  // This loop performs comparison && conditional insertion
  while (pointer1 < arr1.length && pointer2 < arr2.length) {
    const val1 = arr1[pointer1]
    const val2 = arr2[pointer2]

    if (val1 < val2) {
      arr.push(val1)
      pointer1++
    } else {
      arr.push(val2)
      pointer2++
    }
  }

  // These conditional blocks insert the remaining items
  // AFTER at least one array is complete
  if (pointer1 < arr1.length) {
    for (let i = pointer1; i < arr1.length; i++) {
      arr.push(arr1[i])
    }
  } else if (pointer2 < arr2.length) {
    for (let i = pointer2; i < arr2.length; i++) {
      arr.push(arr2[i])
    }
  }

  return arr
}
```

## Implementing Merge Sort

The pseudocode to sort subarrays involves *divide and conquer* via *recursion*:

1. Break up the array into 2 halves.
2. Continue halving the subarrays until all subarrays have 0 or 1 elements.
3. Using the `merge` helper function, merge the subarrays back together and return the full sorted array.

The code implementation goes something like this:

```js
mergeSort = arr => {
  if (arr.length <= 1) return arr // <= base case

  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))

  return merge(left, right)
}

// Let's step through a small invocation:
mergeSort(10, 24, 76, 73)
// 1. [10, 24, 76, 73] get split up into [10, 24] and [76, 73]

// 2. mergeSort([10, 24]) called on the left
// [10, 24] get split up into [10] and [24] (via mergeSort base case)
// [10] and [24] are merged and [10, 24] is returned

// 3. mergeSort([76, 73]) called on the right
// [76, 73] split up into [76] and [73] (via mergeSort base case)
// [76] and [73] are merged and [73, 76] is returned

// [10, 24] and [73, 76] are merged and [10, 24, 73, 76] is returned

// NOTE: In total, the call stack goes up to 3 levels
```

## Big O

### Time complexity

The time complexity of merge sort in every case is `O(n log n)`. That means that it doesn't complete nearly sorted arrays *sooner*. It will treat nearly sorted arrays the same as unsorted arrays.

The **decomposition** of the array is `O(log n)`. An 8-element array requires 3 levels of decomposition, a 16-element array requires 4, a 32-element array requires 5, and so on.

Additionally, the `merge` function itself has a time complexity of `O(n)`. That's because at any given level of decomposition, there is always `n` number of elements--regardless of how many subarrays there may be. `[1], [2], [3], [4]` is the same as `[1, 2], [3, 4]` and `[1, 2, 3, 4]`. We also know that each element goes through exactly 1 comparison operation in the `merge` function.

Therefore, at every level of decomposition, there are `n` comparisons. And since `log n` tells us the *number* of decompositions, `n * log n` or `n log n` defines the *total* number of operations.

In other words, merge sort has `O(log n)` decompositions and `O(n)` comparisons *per* decomposition.

**Note**: `O(n log n)` is the *best* we can hope for from sorting algorithms. The only exception is when you take advantage of a weird quirk of the data types involved. For example, radix sort uses a quirk with numbers, so it only works with numbers.

### Space complexity

The space complexity of merge sort is `O(n)` because every element becomes its own subarray. That means you're storing `n` number of arrays in memory due to decomposition.