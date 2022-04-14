---
title: 'Arrays'
part: 5
date: '2022-04-12'
categories: [compsci]
tags: [data structures, algorithms]
source: [algoexpert]
---

# Arrays

## How arrays work under the hood

Recall that memory can be understood as a bounded/finite memory canvas containing memory slots, each with a memory address.

Overall, when you declare a array with values, it will find a *back-to-back series of memory slots* to store all of the values. So, if your array has three 32-bit integers, that means it needs 12 memory slots (for 12 bytes) to store everything.

## Static vs. dynamic arrays

**Static arrays** have a fixed number of memory slots that the operating system allocates for the array--as defined by the developer. (In languages like Java or C++, you declare the length you want your array to be, which defines the exact number of memory slots needed.)

**Dynamic arrays**, as a sloppy blanket rule, allocate about **double the amount of memory slots** than you specify. This allows you to perform insertions more efficiently. (We'll get back to the point about insertion efficiency later.)

## Why index access of an array is an elementary operation

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

## Array operations and their spacetime complexity

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

## Spacetime complexity of static array insertion

When dealing with *static arrays*, time complexity of insertion is `O(n)`. Whether you're inserting at the beginning, middle, or end, the operating system cannot be confident that there is enough back-to-back memory slots to accomodate the new item being inserted. For example, if the array takes up memory slots 15 to 26, it can't be certain that memory slot 27 and up are free. So, it will usually *copy the entire array* and look for a *new* series of memory slots somewhere else that it knows can accommodate the new length of the array.

As a result, space complexity of insertion is `O(1)`. Since you're moving the array, you're freeing up space before taking up space, so no extra space gets used up.

## Spacetime complexity of dynamic array insertion

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

## Complexity of operations on a fraction of an array

Imagine you insert or remove an element in the middle of an array. Or maybe you traverse through half of the array. Wouldn't the time complexity be half?

Once again, if we say the time complexity is `O(0.5n)`, we drop `0.5` because it's a constant, so it's still `O(n)`.

This makes sense because the key point is that these operations on fractions of an array are *still* related to the input size. So, if you have quadrillion elements in the array, that fraction could still be a huge number!

