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

The basic idea of **bubble sort** is that you loop through an array, **compare** adjacent values, and **swap** their positions whenever a higher value is found. Through this process, the largest values will always **bubble to the top**.

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

**Selection sort** works by looping through a subarray of an array, keeping tracking of the position of the smallest value, and then swapping its position to the front of the subarray. This subarray begins as the full array and then shifts to the right with each iteration.

The pseudocode is as follows:

1. Loop through the array.
2. Store the index of the current element.
3. Nested loop through the array starting at the current index *plus 1*. This is the subarray.
4. Compare the items in the nested loop with the element at the stored index. If a smaller value is found, replace with *that* index.
5. If the stored index is *not* the same as your first index, swap the values at those indices.

The code implementation goes something like this:

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
```

### Time complexity

Just like bubble sort, selection sort uses nested loops, so it has a time complexity of `O(n^2)`.

**Note**: Selection sort is sometimes the better algorithm when you care about *writing to memory*. Because selection sort only does 1 swap per iteration, the write to memory is smaller than, say, bubble sort, which performs `n^2` swaps.

## Insertion Sort

**Insertion sort** builds up a sort by gradually *inserting* values into their sorted positions in a sorted left portion of the array.

**Note**: Insertion sort is actually **practical** in that it's quite efficient. This is the most useful sort compared to bubble and selection sort.

The pseudocode is as follows:

1. Start with the second element in the array. The first element is the sorted portion.
2. From right to left, compare target element with the elements in the sorted portion.
3. If the target element is ever *greater than or equal to* an element in the sorted portion, insert the target element *in front* of it.
4. Repeat for the next element in the array, expanding the size of the sorted portion by 1 with each iteration.

And code implementation goes something like this:

```js
```

### Time complexity