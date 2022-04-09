---
title: 'Data Structures Crash Course'
part: 1
date: '2022-04-08'
categories: [compsci]
tags: [data structures, algorithms]
source: [algoexpert]
---

# Data Structures Crash Course

## What are Data Structures?

### The point of learning data structures

The fundamental purpose of coding interviews is to evaluate your problem-solving skills.

Data structures are simply the concepts and tools you use to solve problems better.

### Definition of data structures

At its core, all programming is just **manipulating data**: taking data from one place to another and massaging it into a format that you want along the way.

High-level, **data structures** are really just a way to organize and manage that data.

More formally, data structures can be defined by three main components:

* A collection of data values,
* The relationships among them, and
* The functions and operations that can be applied to the data.

## Complexity Analysis

### Definition of complexity analysis

In many cases, when you try to solve a problem, you'll find multiple solutions. How do you determine which is the *best* solution among them?

(This is also a common interview question. Once you solve a problem, you may be asked, "Can you do better?")

**Complexity analysis** is a means of evaluating the quality of a solution, so you can compare it to other solutions. It typically just means figuring out two metrics:

* **Time complexity**
  * How fast a solution runs
* **Space complexity**
  * How much memory a solution uses up

### Connection to data structures

Recall that data structures involve "functions and operations that can be applied to the data". *These* functions and operations have time and space complexity ramifications: they take up time and memory.

Additionally, the relationships among data values in data structures have time and space complexity ramifications too.

So, when in a coding interview, choosing a data structure becomes about

* Finding the data structure that solves the problem
* Finding the data structure that also solves it fastest and with the least memory usage

## Memory

### Memory slots

When you perform a simple operation like declare a variable, you are asking the computer to store the value in an **available memory slot or series of memory slots**, which each have a zero-indexed **memory address**.

A single memory slot contains **8 bits** or a **byte**, which means **256 possible values** in an available memory slot. When a value requires multiple memory slots, it then takes up a back-to-back series of available memory slots.

**Pro tip**: Now it makes sense why there are 32-bit integers or 64-bit integers. These integers are represented by either 4 or 8 memory slots respectively. These are known as *fixed-width integers*.

**Note**: You may wonder how you can store strings. The solution is to use a mapping of characters to numbers (like ASCII). We'll return to this more later.

> **Important**: The amount of memory slots is **bounded** or **finite**, so that's why we care about space complexity!

### Accessing memory slots

Accessing a memory slot or series of memory slots is considered an **elementary operation**, i.e., treated as a single unit of work. This is because it's trivial for a computer to do it: it is a very fast operation.

An example of such an elementary operation would be accessing a value in a list at an index. This is essentially accessing a memory slot.

### Pointers

A **pointer** is essentially storing a memory address *in* a memory slot (or series of memory slots). That way when you access the memory slot, the computer then knows to go to the other memory slot associated to the memory address.

Pointers come with a few benefits:

* You don't have to have all of your data in a back-to-back series since you can now point to anywhere you want

## Big O Notation

### How to measure complexity

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

### Why we write `O(1)`

Imagine your algorithm just takes the first value in an array and adds 1:

```js
const f = arr => arr[0] + 1
```

This algorithm is considered `O(1)`. But why? Technically, the function performs more than one operation. For example, if we're dealing with 32-bit integers, accessing `1` and `arr[0]` could each require accessing 4 memory slots. So, maybe it's more accurate to say `f`'s time complexity is `O(8)`.

The reason we don't write `O(8)` is that asymptotic analysis doesn't care about the exact number of operations as long as **those operations don't have any relation to the size of the input `arr`**. As the size of `arr` increases, `f` *still* performs 8 operations no matter what.

For this reason, asymptotic analysis simplifies the result to `O(1)`.

(The same reasoning would apply to more complex operations as long as the operations are constant. Examples of such operations might be addition, multiplication, etc.)

### Combining complexities

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

### Worst-case vs. best-case scenarios

In all of our complexity analyses, we always assume **worst-case scenario**: what happens to an algorithm when it gets a *huge* input size.

However, some algorithms have different complexity measurements in the best-case scenario vs. average-case scenario vs. worst-case scenario, and you may pick an algorithm for its best-case or average-case results.

### Multiple inputs

Suppose you have a function that takes in 2 inputs:

```js
const twoInputF = (arr1, arr2) => {
    // ...
}
```

Now suppose the operations we perform on `arr1` are `O(n^2)`, while the operations performed on `arr2` are `O(m)`. In total, that means the time complexity is `O(n^2 + m)`.

Do we drop `m` since `n^2` could get so much bigger?

The answer is *no* because the input sizes `n` and `m` are independent: the size of one doesn't relate to the size of another. As a result, you want to capture each of them in your complexity analysis.

## Logarithm

The way to mathematically understand a **logarithm** is by translating it to its exponent form: `log b x = y  iif b^y = x`.

In other words, a logarithm is just asking, "What exponent value `y` applied to base `b` would create `x`?" In even simpler terms, how many times would I be able to divide `x` by `b` before the result is `1`?

**Note**: In computer science, base `b` is always equal to 2. This is known as **binary logarithm** and is defined by the equation `log n = y iff 2^y = n`. (We drop base 2 because it's implied.)

To get the intuition for why logarithmic complexities are so efficient, just think about what it takes to increment the logarithm:

* A logarithm of `0` means the input size must be `1` because `2^0 = 1`
* A logarithm of `1` means the input size must be `2` because `2^1 = 2`
* A logarithm of `2` means the input size must be `4` because `2^2 = 4`
* A logarithm of `10` means the input size must be `1024` because `2^10 = 1024`
* A logarithm of `20` means the input size must be `1048576` because `2^20 = 1048576`

**Every increment to the logarithm requires a *doubling* of the input size**. As a result, as the input size gets huge, this will require a dramatic difference in input sizes to have any effect on the complexity of a logarithmic algorithm.

### A sign of logarithm complexity

You know you're likely dealing with an algorithm with logarithmic complexity when the input size gets sliced in half at every step. An example of this would be *binary search*.

## Arrays

### How arrays work under the hood

Recall that memory can be understood as a bounded/finite memory canvas containing memory slots, each with a memory address.

2:00

### Array operations and their spacetime complexity