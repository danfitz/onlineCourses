---
title: 'Radix Sort'
part: 10
date: '2020-03-17'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

# Radix Sort

All sorting algorithms we've learnt so far use **comparison**. The lower bound number of comparison operations in all sorting algorithms is `O(n log n)`. (This has to do with the limited amount of information obtained from a comparison: [source](https://en.wikipedia.org/wiki/Comparison_sort).) You can't do better *unless* you sort without using comparison. This is where algorithms like **radix sort** come in.

Algorithms like radix sort fit into a group called **integer sorts**, where they sort by taking advantage of special properties found only in integers.

**Note**: You could convert strings into numerical representations and then sort those numbers. That's a workaround.

## How It Works

Radix sort takes advantage of the fact that we know **numbers with more digits must be larger**. It doesn't matter what those numbers are either: 111 is larger than 99.

Using this fact, radix sort loops through a list and buckets the values by the ones place, turning it back into a list *in the order it was bucketed*. It then does the same for the tens place, hundreds place, and so on for all place values.

The number of loops performed depends on the *largest number*. So if `1591` is the largest number, 4 loops are performed.

## Helper Functions

Radix sort requires a few helper functions in order to work:

* `getDigit` grabs number at specified place value
* `digitCount` returns the number of digits in a number
* `maxDigits` uses `digitCount` to return the number with the largest digits in a list


### getDigit

```js
// String version
const getDigit = (num, place) => {
  const strNum = String(Math.abs(num)) // <= ignores negative values
  const digit = strNum[strNum.length - place - 1]
  
  if (digit === undefined) return 0
  else return parseInt(digit)
}

getDigit(12345, 0) // 5
getDigit(12345, 5) // 0

// Number version
const getDigit = (num, place) => {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10
}
```

### digitCount

```js
const digitCount = num => {
  return String(Math.abs(num)).length
}
// OR
const digitCount = num => {
  if (num === 0) return 1
  return Math.floor(Math.log10(Math.abs(num))) + 1
}
```

### mostDigits

```js
const mostDigits = nums => {
  let highestDigits = 0
  for (let i = 0; i < nums.length; i++) {
    const current = digitCount(nums[i])
    if (current > highestDigits) {
      highestDigits = current
    }
  }
  return highestDigits
}
```

## Implementation

The pseudocode goes like this:

1. Figure out how many digits the largest number has
2. Loop through the list as many times as the largest number of digits
3. For each loop, create buckets for digits 0 to 9 and add numbers into those buckets based on the digits at the target place value.
4. Merge the buckets, keeping the items in their current order.

```js
const radixSort = nums => {
  // 1. Get largest number's # of digits
  const highestDigits = mostDigits(nums)

  // 2. Loop through number of digits
  for (let i = 0; i < highestDigits; i++) {
    // 3a. Create buckets
    const buckets = [[], [], [], [], [], [], [], [], [], []]

    // 3b. Insert appropriate digit into appropriate bucket
    for (let j = 0; j < nums.length; j++) {
      const digit = getDigit(nums[j], i)
      buckets[digit].push(nums[j])
    }

    // 4. Merge buckets
    nums = []
    for (let k = 0; k < buckets.length; k++) {
      nums = nums.concat(buckets[k])
    }
    // THIS ALSO WORKS:
    // nums = [].concat(...buckets)
  }

  return nums
}
```

## Big O

### Time complexity

The time complexity of radix sort in all cases is `O(nk)` where `k` is the largest number's number of digits--known as its **word size**.

However, `k` can vary a lot, making radix sort's time complexity variable as well. For example, if every value in the array is distinct, `k` ends up being `log n`, making radix sort `O(n log n)`, which is no better than the best sorting algorithms.

### Space complexity

The space complexity of radix sort if `O(n + k)`. I'm not sure why `k` is there though...