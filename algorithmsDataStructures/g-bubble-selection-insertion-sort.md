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
3. If the target element is *smaller than* the current element in the sorted portion, move the current element to the right.
4. If the target element is *larger than* the current element, insert the target element to the right of the current element and break the loop.
4. Repeat for the next element in the unsorted portion of the array, expanding the size of the sorted portion by 1 with each iteration.

And code implementation goes something like this:

```js
const insertionSort = unsortedArr => {
  const arr = [...unsortedArr]

  for (let i = 1; i < arr.length; i++) {
    const currentVal = arr[i]

    for (var j = i - 1; j >= 0; j--) {
      if (currentVal < arr[j]) {
        arr[j + 1] = arr[j]
      } else {
        break
      }
    }

    // Insert where arr[j] USED to be
    // Must be + 1 because j-- takes you down 1 
    arr[j + 1] = currentVal
  }

  return arr
}

insertionSort([2, 4, 1])
// [2, 4, 1] (first iteration)
// [2, 2, 4] (second iteration)
// [1, 2, 4]
```

### Time complexity

Just like bubble and selection sort, insertion sort has a nested loop, making it `O(n^2)`.

However, in the best case where the array is *nearly sorted*, the algorithm is `O(n)` because it only makes 1 comparison for each item that already sorted. When it hits an unsorted item, *then* it'll loop through the sorted portion. Example: `[1,2,3,4,-1]`.

Inversely, if the array is sorted in reverse order, then sorting it will be *the hardest* because each nested loop will have to run its full course before completing. Example: `[4,3,2,1]`.

**Pro tip**: Because insertion sort is great with nearly sorted arrays, it's excellent at *continnuously sorting on the fly*. For example, if you have sorted data where users are adding to it live (e.g. live stream), you could use insertion sort to insert what comes in *quickly*.

## Comparing Time Complexity

In general, bubble, selection, and insertion sort have a time complexity of `O(n^2)`.

However, where they differ is when it comes to best case scenario: nearly sorted data. Specifically, selection sort sucks in compared to the others.

* Bubble sort is best case `O(n)` because if only 1 item is unsorted, the second iteration will perform no swaps, which will stop the function.
* Insertion sort is also best case `O(n)` because it will move onto the next item if the current item is already larger than the items to the left.
* However, selection sort is still `O(n^2)` in the best case because it will still loop through the entire array, searching for the smallest item in each iteration (but never finding one).

## Comparing Space Complexity

Bubble, selection, and insertion sort all have a space complexity of `O(1)` because all data is stored in place and then removed in the next iteration.