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

Overall, when you declare a array with values, it will find a *back-to-back series of memory slots* to store all of the values. So, if your array has three 32-bit integers, that means it needs 12 memory slots (for 12 bytes) to store everything.

### Static vs. dynamic arrays

**Static arrays** have a fixed number of memory slots that the operating system allocates for the array--as defined by the developer. (In languages like Java or C++, you declare the length you want your array to be, which defines the exact number of memory slots needed.)

**Dynamic arrays**, as a sloppy blanket rule, allocate about **double the amount of memory slots** than you specify. This allows you to perform insertions more efficiently. (We'll get back to the point about insertion efficiency later.)

### Why index access of an array is an elementary operation

Recall that we said that accessing an item in an array is an elementary operation. The reason for this is because the complexity is always constant: no matter the size of the array, accessing an item always takes the same amount of work.

To illustrate the point, it's best to look at static arrays. Suppose you define a static array with three 32-bit integers in Java:

```java
int[] threeInts = { 1, 2, 3 };
```

The operating system now looks for 12 back-to-back memory slots to store `threeInts`. Let's say it finds memory slots at addresses 15 to 26.

Suppose then you try to access the second integer:

```java
threeInts[1];
```

Because the operating system knows that the array starts at memory address 15 and that each item takes up 3 memory slots, it will look for the memory address at `15 + (3 * 1) = 18`. Memory address 18 is where the second integer starts! And since it knows it's dealing with 32-bit integers, that means the second integer takes up 3 memory slots, taking up addresses 18 to 20.

So, all in all, accessing an item in an array is `O(1)` because the following underlying operations don't change with the size of the input:

* Finding the starting point of the array
* Finding the distance from that starting point to find the starting point of the target item

**Note**: *Overwriting* a value at a given index of an array is also constant complexity for the same reasons!

### Complexity of array operations

When declaring an array, spacetime complexity is `O(n)` because


### Array operations and their spacetime complexity

* Getting an item in an array
  * `O(1)` time and space
* Setting/overwriting an item in an array
  * `O(1)` time and space (same reasons above previous section)
* Initializing array
  * `O(n)` time (because amount of memory slot assignment increases linearly with `n`)
  * `O(n)` space (because amount of memory slots required increases linearly with `n`)
* Traversing array
  * `O(n)` time (because the amount of iterations required increases linearly with `n`)
  * `O(1)` space (because you're not storing anything new when traversing)
* Copying array
  * `O(n)` time (because you have to traverse the array to copy all of its contents)
  * `O(n)` space (because you're asking the operating system to store a brand new copy)
* Removing an item at the end of an array
  * `O(1)` time (because you just take the value out of the end of the series of memory slots)
  * `O(1)` space (because you're just moving the value to another location in memory)
* Removing an item at the beginning or middle of an array
  * `O(n)` time (because the operating system has to shift the position of every other element in the array to fill the gap)
  * `O(1)` space (because you're just moving the value to another location in memory)

### Spacetime complexity of static array insertion

When dealing with *static arrays*, time complexity of insertion is `O(n)`. Whether you're inserting at the beginning, middle, or end, the operating system cannot be confident that there is enough back-to-back memory slots to accomodate the new item being inserted. For example, if the array takes up memory slots 15 to 26, it can't be certain that memory slot 27 and up are free. So, it will usually *copy the entire array* and look for a *new* series of memory slots somewhere else that it knows can accommodate the new length of the array.

As a result, space complexity of insertion is `O(1)`. Since you're moving the array, you're freeing up space before taking up space, so no extra space gets used up.

### Spacetime complexity of dynamic array insertion

When dealing with *dynamic arrays*, the space complexity is always `O(1)` because you're only adding one new item into memory.

However, for time complexity, things get more complex. To figure out time complexity, we need to understand how dynamic arrays work under the hood:

1. When a dynamic array `[1, 2, 3]` is declared, it allocates double the memory slots, giving space for 6 items: `[1, 2, 3, _, _, _]`.
2. For the first three insertions, time complexity is `O(1)`
3. Once the memory slots are filled up like `[1, 2, 3, 4, 5, 6]`, the next insertion will copy the entire array to a new series of memory slots, making the time complexity `O(n)`
4. For this new series of memory slots, it then allocates *double* the memory slots *again*, giving space for 12 items now!

So what is the time complexity of dynamic array insertion: `O(1)` or `O(n)`?

For insertion at the beginning or in the middle, this doubling of memory slots provides no benefit. When you insert in the middle or end of an array, you're asking the operating system to **shift** the position of every element to make room for the new element. Because the operating system has to change the memory slots of every element, insertion at the beginning or in the middle is `O(n)` time complexity.

For insertion at the end, time complexity is `O(1)`. We come to this conclusion using **amortized analysis**:

1. Start with an array with one item: `[0]`.
2. If we want to do `m` insertions into the array, every time an expensive insertion happens, the cost is double the previous. Mathematically, the total cost is expressed as `1 + 2 + 4 + ... + m/4 + m/2 + m`.
3. The above series simplifies to `2m`, which means *all* of the expensive insertions during `m` insertions amounts to `2m`.
4. Additionally, the cheap insertions each cost 1, so we say the total cost is `m`. In total, that means the time complexity of `m` insertions is `3m`.
5. Since complexity analysis isn't concerned with constants, we drop the `3`. So, `m` insertions has a cost of `m`, which means each insertion is `O(1)`.

**Bonus**: Another way of thinking about it is that every time you double the memory allocation of the array during an expensive insertion, you give yourself double the amount of cheap insertions. Effectively, the cheap insertions and expensive insertions cancel each other out. That's why it's `O(1)`.

**Note**: Amortized analysis is one of the rare cases in the industry where we don't think in terms of worst case. Amortized analysis is more about looking at the average case.

### Complexity of operations on a fraction of an array

Imagine you insert or remove an element in the middle of an array. Or maybe you traverse through half of the array. Wouldn't the time complexity be half?

Once again, if we say the time complexity is `O(0.5n)`, we drop `0.5` because it's a constant, so it's still `O(n)`.

This makes sense because the key point is that these operations on fractions of an array are *still* related to the input size. So, if you have quadrillion elements in the array, that fraction could still be a huge number!