---
title: 'Problem Solving Patterns'
part: 4
date: '2020-01-02'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

# Problem Solving Patterns

You're faced with a tough challenge. What are the steps you can take to make it solvable? This section will focus on coding **blueprints** or **archetypes** or **patterns** that you can keep in your back pocket to help solve some problems.

Here's the patterns we'll talk about:
1. Frequency counter pattern
2. Multiple pointers pattern
3. Sliding Window Pattern
4. Divide and Conquer Pattern

## Frequency Counter Pattern

When you need to compare values, especially how *often* those values appear, you can collect them in objects/sets using the **frequency counter pattern**.

Often, the *naive* solution to these comparisons is `O(n^2)` because it uses *nested loops*. Take the following example:

```js
// This function compares arr1 to arr2 to see if arr2 contains the squared versions of all numbers in arr1
const same = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false // <= Short circuit for a fast return

  // FIRST LOOP
  for (let i = 0; i < arr1.length; i++) {
    const correctIndex = arr2.indexOf(arr1[i] * arr1[i]) // <= SECOND LOOP
    if (correctIndex === -1) return false

    arr2.splice(correctIndex, 1)
  }

  return true
}

same([1,2,3], [4, 1, 9]) // <= returns true
```

Notice how we have a nested loop, making the time complexity quadratic. Here's the frequency counter solution:

```js
const frequencySame = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false

  const frequencyCounter1 = {}
  const frequencyCounter2 = {}

  // Loop through arr1 and COUNT occurrence of values
  for (let val of arr1) {
    frequencyCounter1[val] = frequencyCounter1[val] ? frequencyCounter1[val] + 1 : 0
  }

  // Loop through arr2 and COUNT occurrence of values
  for (let val of arr2) {
    frequencyCounter2[val] = frequencyCounter2[val] ? frequencyCounter2[val] + 1 : 0
  }

  // Check that frequency counters don't have any differences
  for (let key in frequencyCounter1) {
    if (!frequencyCounter2[key * key]) return false // <= Is there a square of the value?
    if (frequencyCounter2[key * key] !== frequencyCounter1[key]) return false // <= Do they have the same # of occurrences?
  }

  // If all tests passed in frequency counter, it's true!
  return true
}
```

Notice that the frequency counter pattern only has a time complexity of `O(3n)` because there are 3 loops, which can be simplified to `O(n)`.

## Multiple Pointers Pattern

The **multiple pointers pattern** maintains several pointers corresponding to *positions/indices* in a data structure, moving those pointers from the beginning, from the end, or towards the middle depending on some set conditions.

Let's see a naive vs. multiple pointer solution to a problem:

```js
// Create a function that takes an ALREADY sorted array of numbers and tries to return the first 2 numbers with a sum = 0

// This naive solution is `O(n^2)` because it's a nested loop
// For each number, it loops through EVERY number after it to see if any sums to 0
const naiveSumZero = nums => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) return [nums[i], nums[j]]
    }
  }
}

// This multiple pointers solution is `O(n)` because it only iterates through the array ONCE
const pointersSumZero = nums => {
  // Maintaining 2 pointers at opposite ends of the array...
  let left = 0
  let right = nums.length - 1

  // While the pointers don't meet in the middle or CROSS over each other (b/c at that point we've exhausted our options)...
  while (left < right) {
    const sum = nums[left] + nums[right]
    // Return numbers if sum is 0
    if (sum === 0) {
      return [nums[left], nums[right]]
    // If we have a positive sum though, that means the right number's absolute value is larger, so move to the smaller number before it
    } else if (sum > 0) {
      right--
    // Otherwise, it's a negative sum, so the left number's absolute value is larger; we need to move to the next number
    } else {
      left++
    }
  }
}
```

## Sliding Window Pattern

## Divide and Conquer Pattern