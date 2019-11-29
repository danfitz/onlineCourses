---
categories: [compsci]
tags: [js, algorithms]
title: "JavaScript Algorithms and Data Structures Masterclass Module 1: Big O Notation"
source: [udemy]
---

## Motivation for Big O Notation

There are dozens of algorithms and/or data structures that can solve a problem you're faced with, and each one can be fundamentally different in its approach.

How do we know which is best? **Big O notation** is about generalizing code and talking about its **performance** compared to other pieces of code.

More importantly, big O notation allows us to **numerically represent** the performance of our code (as opposed to using vague descriptions like "it's OK" or "pretty good").

**Note**: Big O notation isn't a black and white calculation that can tell you the best solution in all cases. Implementations can have trade-offs.

## What is Big O Notation?

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

### Speed and the problem with time

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

## Big O Expressions

## Time Complexity and Space Complexity

## Logarithms
