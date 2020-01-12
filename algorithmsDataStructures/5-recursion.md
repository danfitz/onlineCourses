---
title: 'Recursion'
part: 5
date: '2020-01-11'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

# Recursion

**Recursion** is the process of performing some operations to solve some problem over and over again--each time with smaller and smaller pieces (or changing pieces)--until you reach a **base case** or endpoint that tells you to stop.

We'll do the following in this section:
1. Define recursion and how it can be used
2. Understand the 2 essential components of recursion
3. Visualize the call stack for debugging and understanding recursive functions
4. Helper method vs. pure recursion

## What is Recursion?

Recursion is basically just a process, namely a function, that **calls itself**.

### Why use it?

Technically, you don't have to use recursion because all recursive solutions can be implemented iteratively too. However, there is really one good reason to use recursion: with some data structures, it's cleaner and more intuitive to use recursion to navigate them.

### Essential components

The first essential component of recursion is the requirement of a **base case**: a condition that ends the recursive function calls. Without a base case, recursion goes on infinitely.

The second essential component is passing different inputs/arguments into the recursive function calls. If you keep passing the same arguments, you're repeating the same thing over and over again.

## The Call Stack

What happens behind the scenes when functions are called in JavaScript? It's part of a lower-level data structure called the **call stack**.

When you invoke a function it gets **pushed** onto the top of the call stack. When a `return` statement is made, the compiler will **pop** the function from the call stack--which is always at the *top*.

To see the call stack in action, you can use dev tools. Just add a *breakpoint* on your function. Then you can move through every line of code step by step and view the call stack.

**Note**: Any function below the top of the stack is *halted* by the functions above it.

## Helper Method Recursion

When using recursion, sometimes we want to maintain some **locally scoped variable** *inside* of our function and then return it when the recursion is complete.

With ordinary recursion, we can't do this because locally scoped variables defined *inside* our recursive function get re-declared and override their outer variables!

```js
const recursion = () => {
  // Local variable
  const arr = []
  // Update the variable
  arr.push(1)
  
  // Recursion
  recursion()
  // NOW arr will be re-declared in a new local scope!
}
```

The solution is to use **helper method recursion**, where you have a helper function that performs the recursion inside an ordinary outer function, maintaining any outer variables you declare there:

```js
const filterOdds = nums => {
  const odds = []

  const helper = helperInput => {
    if (helperInput.length === 0) return // base case

    // Conditionally add num to odds array
    const num = helperInput[0]
    if (num % 2 === 1) odds.push(num)

    helper(helperInput.slice(1)) // Recursively call helper using subset of input array
  }

  helper(nums)

  return odds
}
```

**Note**: Helper method recursion is typically very useful for data structures like arrays!