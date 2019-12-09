---
title: 'Problem Solving Approach'
part: 3
date: '2019-12-07'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

# Problem Solving Approach

You're faced with a tough challenge. What are the steps you can take to make it solvable? This section will focus on **devising a plan or approach** to solving such a problem: steps you can take to make it easier.

## Objectives

* Define what an algorithm is
* Devise a plan to solve algorithms
* Compare and contrast problem solving patterns like frequency counters, two pointer problems, and divide and conquer

## How to Solve a Problem

Here's the basic steps to solving a problem:

1. Understand the problem
2. Explore concrete examples
3. Break it down
4. Solve/simplify the problem
5. Look back and refactor

### 1. Understand the problem

It's tempting, especially in a stressful setting like an interview, to jump straight into solving a problem. However, here's some things you want to do to make sure you **understand the problem** first:

* Try to restate the problem in your own words.
* What are the inputs that go into the problem?
* What are the outputs that *should* come from the solution to the problem?
* Can the outputs be *determined* from the inputs? In other words, are the inputs enough information to get the outputs expected?
* How should I label the important pieces of data that are part of the problem? Is there key *terminology* I should create? (Example: parameter names)

### 2. Explore concrete examples

Benefits of coming up with concrete examples:
* Helps you understand the problem better
* You can use the examples as *sanity checks* to check your work; they tell you inputs and expected outputs

**Pro tip**: In the working world, **user stories** and **unit tests** are both cases of concrete examples. They're ways of checking that a given input leads to a certain expected output.

When creating and exploring your concrete examples, you can follow this pattern:
1. Start with simple examples first
   * What are the easiest use cases? How do you solve *them* first?
2. Progress to more complex examples next
3. Jump to edge cases
   * What are some examples of **empty inputs**?
   * What are some examples of **invalid inputs**?

Let's walk through an example together.

```js
// Write a function that takes in a string and returns counts of each character in the string

// 1. Start with a simple example
charCount('aaaa') // maybe we're expecting { a: 4 } back
// Question: should our returned object include references to characters that have a 0 count? Like { a: 4, b: 0, ... }

// 2. Progress to complex examples
charCount('Your total comes to $500.00')
// Questions: Do we care about uppercase and lowercase? Spacing? Punctuation? Special characters? Numbers?

// 3. Explore empty inputs
charCount('') // what do we want to return here? An empty object? false? null? undefined?

// 4. Explore invalid inputs
charCount({})
charCount(5)
// How do we handle these cases and more?
```

### 3. Break it down



### 4. Solve/simplify the problem

### 5. Look back and refactor