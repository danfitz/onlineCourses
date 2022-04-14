---
title: 'Big O Notation'
part: 3
date: '2022-04-10'
categories: [compsci]
tags: [data structures, algorithms]
source: [algoexpert]
---

# Big O Notation

## How to measure complexity

When we measure time complexity of an algorithm, we are actually aiming to measure how its speed is **affected by the size of its input**. This is known as **asymptotic analysis**.

Here are the most common measures of time complexity (from best to worst):

* Constant time complexity `O(1)`
  * As the input increases, the time to perform the operations *doesn't change*
* Logarithmic time complexity `O(log n)`
  * As the input increases, the time to perform the operations increases *logarithmically*
* Linear time complexity `O(n)`
  * As the input increases, the time to perform the operations increases *linearly*
* Product of logarithmic and linear time complexity `O(n * log n)`
* Exponential time complexity `O(n^2)`, `O(n^3)`, `O(n^4)`
  * As the input increases, the time to perform the operations increases *exponentially*

**Note**: There are even worse complexities like `O(2^n)` and `O(n!)`, where `n!` is worse because most of the factors of the product are larger than 2.

## Why we write `O(1)`

Imagine your algorithm just takes the first value in an array and adds 1:

```js
const f = arr => arr[0] + 1
```

This algorithm is considered `O(1)`. But why? Technically, the function performs more than one operation. For example, if we're dealing with 32-bit integers, accessing `1` and `arr[0]` could each require accessing 4 memory slots. So, maybe it's more accurate to say `f`'s time complexity is `O(8)`.

The reason we don't write `O(8)` is that asymptotic analysis doesn't care about the exact number of operations as long as **those operations don't have any relation to the size of the input `arr`**. As the size of `arr` increases, `f` *still* performs 8 operations no matter what.

For this reason, asymptotic analysis simplifies the result to `O(1)`.

(The same reasoning would apply to more complex operations as long as the operations are constant. Examples of such operations might be addition, multiplication, etc.)

## Combining complexities

Imagine you have 3 functions:

```js
const constantF = arr => arr[0] + 1
const linearF = arr => arr.reduce((sum, x) => sum + x, 0);
const quadraticF = arr => arr.map(x => arr.map(y => [x, y]));
```

Now imagine you create a function that uses all 3:

```js
const combinedF = arr => {
    constantF(arr);
    linearF(arr);
    quadraticF(arr);
}
```

The complexity of `combinedF` would be `O(n^2 + n + 1)`. However, as the input size of `n` gets huge, `n + 1` will be insignificant compared to `n^2`. Thus, according to asymptotic analysis, we simplify it to `O(n^2)`.

Similar reasoning applies when you run `quadraticF` multiple times:

```js
const repeatedF = arr => {
    quadraticF(arr);
    quadraticF(arr);
    quadraticF(arr);
}
```

You could say `repeatedF` has a time complexity of `O(3n^2)`, but we simplify it to `O(n^2)`.

**Important**: One of the only times we don't drop constants is with exponential time complexities. There is big difference between `O(n^2)` and `O(n^4)`, so we keep the exponent to communicate the difference.

## Worst-case vs. best-case scenarios

In all of our complexity analyses, we always assume **worst-case scenario**: what happens to an algorithm when it gets a *huge* input size.

However, some algorithms have different complexity measurements in the best-case scenario vs. average-case scenario vs. worst-case scenario, and you may pick an algorithm for its best-case or average-case results.

## Multiple inputs

Suppose you have a function that takes in 2 inputs:

```js
const twoInputF = (arr1, arr2) => {
    // ...
}
```

Now suppose the operations we perform on `arr1` are `O(n^2)`, while the operations performed on `arr2` are `O(m)`. In total, that means the time complexity is `O(n^2 + m)`.

Do we drop `m` since `n^2` could get so much bigger?

The answer is *no* because the input sizes `n` and `m` are independent: the size of one doesn't relate to the size of another. As a result, you want to capture each of them in your complexity analysis.

