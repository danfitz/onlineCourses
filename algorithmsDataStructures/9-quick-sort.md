---
title: 'Quick Sort'
part: 9
date: '2020-03-16'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

# Quick Sort

Just like merge sort, **quick sort** utilizes recursion and the fact that arrays with 0 or 1 elements are, by default, sorted.

What makes quick sort unique is it uses a **pivot**: an element where, based on its value, all values smaller than it are moved to the *left side* of the array and all values larger than it are moved to the *right side*. From there, we know that the pivot is in the **correct spot**.

We then pick new pivots for the left and right sides and recursively repeat the process.

## Pseudocode

Here's how quick sort roughly works:

1. Select any value. That's your pivot.
2. Loop through the array, keeping track of a swap index value.
3. For any value smaller than the pivot, increment the swap index and swap the smaller value with the item at the swap index.
4. When you're done looping, swap the pivot with the value at the swap index. The pivot is now sorted.
5. Recursively repeat this for the subarrays to the left and to the right of the pivot.

## Pivot Helper

The first part of quick sort is the code for placing the pivot at the correct index, making sure all values to the left are smaller and all values to the right are larger.

**Note**: Although any pivot can work, the best one is usually the median value where the left and right side are equal in size. However, this is hard to do when the data is unpredictable. Other options include the first element, last element, middle element, etc. There are consequences to each choice that will be discussed shortly.

```js
// This function performs the pivot (bounded by a start and end index) and returns the index of the sorted element
const pivot = (arr, start, end) => {
  // Pivot is the left-most value
  let swapIndex = start
  const pivot = arr[start]

  // Swap all values smaller than pivot at incremented swapIndex
  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivot) {
      swapIndex++
      swap(arr, swapIndex, i)
    }
  }

  // Swap pivot at swapIndex
  swap(arr, start, swapIndex)

  return swapIndex
}
```

## Implementation

Using the `pivot` helper function, we now use the index it returns to *recursively* invoke `pivot` on the left subarray and right subarray.

```js
const quickSort = (arr, start=0, end=arr.length-1) => {
  // base case
  // > comparison accounts for when start === pivotIndex b/c no values swapped
  // and pivotIndex - 1 or + 1 in recursive call
  if (start >= end) return

  const pivotIndex = pivot(arr, start, end)

  quickSort(arr, start, pivotIndex - 1) // left
  quickSort(arr, pivotIndex + 1, end) // right

  return arr
}
```

### My implementation

This is how I implemented quick sort before going through the videos. Keeping it here for posterity.

```js
const quickSort = (arr, start=0, end=arr.length-1) => {
  if (start >= end) return

  const pivot = arr[start]
  let pivotIndex = start

  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivot) {
      pivotIndex++
      swap(arr, pivotIndex, i)
    }
  }
  swap(arr, start, pivotIndex)

  quickSort(arr, start, pivotIndex - 1)
  quickSort(arr, pivotIndex + 1, end)
}
```

## Big O

### Time complexity

The best and average case for quick sort is `O(n log n)`, and the worst case is `O(n^2)`.

Just like merge sort, the recursive decomposition is `O(log n)` because it splits arrays in half over and over. Also, on each level of decomposition, we're making `n` comparisons during the `pivot` helper, making the pivot itself `O(n)`.

However, you run into the worst case `O(n^2)` based on the pivot *chosen*. For example, choosing the left-most element as the pivot ends up being `O(n^2)` when dealing with already sorted data. That's because there are `n` decompositions *and* `n` comparisons per decomposition:

```js
// [1, 2, 3, 4, 5] loops through 4 elements and recursively calls...
// [2, 3, 4, 5], which loops through 3 elements and recursively calls...
// [3, 4, 5]...
// [4, 5]...
// [5]
```

Specifically, you run into the worst case when the pivot is always the *minimum* or *maximum* element, leading to recursive calls always looping through `n - 1` elements. 

**Pro tip**: The solution to avoid the worst case is to try our best to avoid picking the minimum or maximum element. This is not 100% avoidable, but we can try our best by doing things like picking a random index or picking the middle index.

## Space complexity

The space complexity of quick sort is `O(log n)`. That's because we have to retain memory for each recursive call in the call stack, which is determined by the number of decompositions performed.