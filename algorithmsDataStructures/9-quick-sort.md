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
2. Loop through the array.
3. For any value smaller than the pivot, count it and move it in front of the pivot.
4. When you're done looping, move the pivot to the index after all the smaller values (based on count). The pivot is now sorted.
5. Recursively repeat this for the subarrays to the left and to the right of the pivot.

```js
const quickSort = arr => {
  if (arr.length <= 1) return arr

  const pivot = arr[0]
  let count = 0

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      count++
      const temp = arr[i]
      arr[i] = arr[count]
      arr[count] =  temp
    }
  }

  const temp = arr[count]
  arr[count] = pivot
  arr[0] = temp

  quickSort(arr.slice(0, count))
  quickSort(arr.slice(count))
}
```

## Pivot Helper

The first part of quick sort is the code for placing the pivot at the correct index, making sure all values to the left are smaller and all values to the right are larger.

**Note**: Although any pivot can work, the best one is usually the median value where the left and right side are equal in size. However, this is hard to do when the data is unpredictable. Other options include the first element, last element, middle element, etc. There are consequences to each choice that will be discussed shortly.

```js
const pivot = arr => {
  let pointer = 0
  const pivot = arr[pointer]

  // Swap all values smaller than pivot at pointer index
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      pointer++
      swap(arr, i, pointer)
    }
  }

  // Swap pivot at pointer index
  swap(arr, 0, pointer)

  return pointer
}
```