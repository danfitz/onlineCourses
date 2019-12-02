---
title: 'Big O Notation'
part: 1
date: '2019-11-25'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

# 1- Big O Notation

## Motivation for Big O Notation

There are dozens of algorithms and/or data structures that can solve a problem you're faced with, and each one can be fundamentally different in its approach.

How do we know which is best? **Big O notation** is about generalizing code and talking about its **performance** compared to other pieces of code.

More importantly, big O notation allows us to **numerically represent** the performance of our code (as opposed to using vague descriptions like "it's OK" or "pretty good").

**Note**: Big O notation isn't a black and white calculation that can tell you the best solution in all cases. Implementations can have trade-offs.

## An example

Suppose that we want to get the sum of all numbers from 1 up to n. There are 2 working solutions we can think of:

```js
// Iteration
const addUpTo = n => {
  let sum = 0
  for (let i = 1; i <= n; i++) {
    sum += i
  }
  return sum
}

// Algorithm derived mathematically
const algorithmAddUpTo = n => {
  return n * (n + 1) / 2
}
```

Which is better? What does better even *mean*?
* Faster?
* Measured against benchmarks? (e.g. counting up to 1 billion)
* Less memory-intensive? (i.e. number of variables stored to complete calculation)
* More readable? Brevity? (i.e. number of characters used)

**Pro tip**: We care the most about **speed** and **memory intensiveness**. At the same time, prioritizing these will often come at the cost of readability, so it's a balancing act.

### The problem with time

One way we might want to measure speed is to use a timer.

```js
const time1 = performance.now() // built-in timestamp in browser
addUpTo(1000000000) // 1 billion
const time2 = performance.now()

console.log(`Time elapsed: ${(time2 - time1) / 1000} seconds.`)

const time3 = performance.now()
algorithmAddUpTo(1000000000)
const time4 = performance.now()

console.log(`Time elapsed: ${(time4 - time3) / 1000} seconds.`) // logs MUCH less
```

The above example *does* demonstrate that the algorithm is much more efficient. However, there are a few problems with the timer technique:
1. The time results **vary**--even on the same computer.
2. How do we label the speed of the function? Is it based on percentage of speed relative to the other? Is it the difference? This is unclear.
3. Fast algorithms are sometimes so fast that you can't compare using time, since the time difference is so small or invisible due to the limitations of the computer.
  * **Pro tip**: Very often, you'll be comparing very fast algorithms. If time was your measurement, they'd all look identical.
4. Some code takes hours to run. It would be nice to be able to talk about the speed of our code without relying on these long tests.

### If not time, then what?

Instead of time, the better way is to measure the **number of simple operations** that the computer has to perform.

```js
const addUpTo = n => {
  let sum = 0 // 1 assignment operation
  // 1 assignment, n comparisons, n addition + assignment
  for (let i = 1; i <= n; i++) {
    sum += i // n addition + assignment
  }
  return sum
}

const algorithmAddUpTo = n => {
  return n * (n + 1) / 2 // 3 operations: addition, multiplication, division!
}
```

In the examples above, we might say:
* Iterative approach is `5n + 2`
* Formulaic approach is `3`

However, with big O notation, we aren't really conceerned with whether it's `5n`, `20n`, or `10000n`. The important thing is that the number of operations grow **proportionally with n**.

## What is Big O Notation?

Big O notation is just a way to **formally talk about how the runtime of an algorithm grows as the inputs grow**.

The syntax for big O is `O(f(n))`:
* `O()` denotes that we're talking about big O
* `f()` is the function or algorithm being measured
* `n` is the input passed into `f()`

`f(n)`, when run, generates an **output**, which tells us the runtime in formalized terms. Some classic patterns include:
* **Linear**: `f(n) = n`
* **Quadratic**: `f(n) = n^2`
* **Constant**: `f(n) = 1`
* Or something else entirely!

**Note**: Big O notation is always talking about the **worst-case scenario**: huge inputs. Small inputs usually will be too similar for it to matter.

## Simplifying Big O Expressions

* Multiples of `n` like `100n` don't matter. We just say `n`.
  * Instead, we care about **order of magnitude**: the size of the runtime of an input relative to its previous smaller inputs. In other words, **growth rate**!

* Constant numbers of operations, whether it's `100` or `1000`, get simplified down to `1` for simplicity.

* Smaller terms, like multipliers or constants, don't matter.
  * For example, `95n^2 + 150`, from a **big picture view**, starts to look the same as `n^2`. So we drop `150` and `95` and just say `n^2`.
  * Another example: `n^2 + 5n`. Say `n = 10000`. That means `100,000,000 + 50000`. `5n`, from big picture, is miniscule, so we drop it. 

## Time Complexity and Space Complexity

## Logarithms
