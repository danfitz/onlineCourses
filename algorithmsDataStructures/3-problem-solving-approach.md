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

**Explicitly** write out the steps you need to take during the solution: rough **pseudocode**.

Benefits:
* Forces you to *think* about the code that you write before you write it; more targeted, effective, and **focused**
* Helps you catch/keep in your radar things you're afraid of facing or misunderstandings that may steer you away from the solution

Example:

```js
// Return an object with lowercase alphanumeric characters as keys containing counts
const charCount = str => {
  // Make object to return at end
  // Loop over string
    // For each char...
    // If char is a number/letter AND is not in object, add it and set value to 1
    // If char is a number/letter AND a key in object, so add 1 to count
    // If char is something else (space, punctuation, etc.), don't do anything
  // Return object
}
```

**Pro tip**: If you just start writing thinking you'll figure out the details later, you risk **pigeon-holing** yourself into whatever code you write. Worst case scenario: you'll end up deleting everything you wrote. Breaking down your solution into clear steps solves for this problem.

### 4. Solve/simplify the problem

Now that you've broken down the problem, it's time to **implement** the solution. However, at this stage, if you find that there's small bits you don't really know how to deal with or find challenging, it might make sense to **simplify** the problem first.

In other words, **SOLVE THE PROBLEM**. If you can't, **SOLVE A SIMPLER PROBLEM**!

Solving the problem is not all or nothing. It's dangerous to put all your eggs in one basket and *only* aim for a 100% solution. It's often much better to at least have something to *show for*, so it's smart to solve the 90% you *know* you can do before working on the last 10% you know you'll get stuck on.

The process:
1. Find the core difficulties
2. Temporarily ignore those difficulties
3. Write a simplified solution
   * **Pro tip**: Along the way, you'll often gain insight into how to achieve (4) 
4. Then try to incorporate those difficulties back in if you can

In the example below, we solve 90% of the `charCount` problem *except* how to check if a character is alphanumeric:

```js
const charCount = str => {
  const result = {}

  for (let i = 0; i < str.length; i++) {
    const char = str[i].toLowercase()
    if (result[char]) {
      result[char]++
    } else {
      result[char] = 1
    }
  }

  return result
}
```

With the example, we can then figure out the alphanumeric validation check and simply **plug it into** the existing code.

### 5. Look back and refactor

It's tempting to just stop working on your code once you know that it works. Often times this is acceptable too, if you're tight on time and need something in production fast.

However, it's often important to look back at your code to find ways to improve it. Here's some prompting questions:

* Can you test the result to tell you if it works?
* Is there another way of deriving the result or solving the problem?
  * There's often more than one way of doing anything!
* Can you understand your solution at a glance? How intuitive and legible is it?
* Can you reuse this solution to solve other problems?
  * Finding these connections yields more positive outcomes.
* Can you improve the **performance** of your solution?
  * Think space complexity and time complexity.
* Can you think of other reasons to refactor?
  * Other reasons include: adhering to company's style guide 
* How have other people solved this problem?
  * Getting other people's solutions can teach you a lot about what you can do.
  * **Note**: Sometimes this might mean looking at solutions outside your preferred languages!