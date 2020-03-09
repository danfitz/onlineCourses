---
title: 'Bubble, Selection, and Insertion Sort'
part: 7
date: '2020-03-09'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

# Bubble, Selection, and Insertion Sort

**Sorting** is the process of rearranging items in a collection (e.g. array) so that they're in some sort of order.

**Importance**: Knowing your sorting algorithms matters because every sorting algorithm has its own advantages and disadvantages. Your knowledge can help you decide which one to use in which situation. For example, some sorting algorithms that are normally very slow, when given a *nearly sorted* collection, actually end up the fastest.

## Built-in JavaScript Sorting

The `Array` prototype in JavaScript has a built-in method called `sort`. By default, it converts every value in a string and compares the Unicode value of that string.

To customize the behaviour of `sort`, simply provide a comparator callback function with arguments `a` and `b`. If the callback return a negative number, `a` comes before `b`. If it returns a positive number `b` comes before `a`. If `0`, `a` and `b` stay in place.

## Bubble Sort

The basic idea of **bubble sort** is that you **compare** values, **swapping** their positions whenever a higher value is found. Through this process, the largest values will always **bubble to the top**.

The pseudocode is as follows:

1. Loop through your array starting from the end to the beginning. This is the *highest point* of your array.
2. Nested loop from the beginning of the array until the current position of the outer loop *minus 1*.
3. If the value of the current item in the nested loop is greater than its adjacent item, *swap* them. The highest value will bubble to the current position of the outer loop.
4. **Optimization**: If at any point you perform a nested loop iteration *without* performing a swap, break out of the outer loop.
5. Return the sorted array.

The actual code goes something like this:

```js
const swap = (arr, i, j) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

const bubbleSort = incomingArr => {
  const arr = [...incomingArr]

  for (let i = arr.length - 1; i >= 0; i--) {
    let noSwaps = true
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) swap(arr, j, j + 1)
      noSwaps = false
    }

    if (noSwaps) break
  }

  return arr
}
```

**Note**: If no swaps occur, that means *all* values are already sorted, so you can go ahead and return the array as is. If you don't break when no swaps occur, bubble sort will loop through the *entire* array, even if the array was sorted long ago.

### Time complexity

Roughly, for each item in an array of size `n`, you're making `n` number of comparisons. That means bubble sort is `O(n^2)`.

In the best-case scenario where the array is nearly sorted, bubble sort is `O(n)` because `noSwaps` will short circuit the loop after the first few passes.

## Selection Sort

```js
const selectionSort = unsortedAr => {
  const swap = (arr, i, j) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }

  const arr = [...unsortedArr]

  for (let i = 0; i < arr.length; i++) {
    let min = i

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j
    }

    if (i !== min) swap(arr, i, min)
  }

  return arr
}

### Time complexity

## Insertion Sort

### Time complexity