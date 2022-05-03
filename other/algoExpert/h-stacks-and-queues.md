---
title: Stacks and Queues
part: 8
date: '2022-05-02'
categories:
  - compsci
tags:
  - data structures
  - algorithms
source:
  - algoexpert
---

# Stacks and Queues

## What is a Stack?

An example of a **stack** is a stack of books on a table. When you want to **add** a book to the stack, you add it to the top (because putting it in the middle or bottom is too hard). Then when you want to **remove** a book from the stack, you similarly remove it from the top. This means the same book you added gets removed first.

This is known as the **last in, first out** (LIFO) principle and is the key aspect of stacks.

### Spacetime complexity of stack operations

In a lot of cases, stacks use **dynamic arrays under the hood**, where you add to and remove from the stack via the *end* of the array.

As a result, **push** (insertion) and **pop** (removal) operations for stacks are always `O(1)`, since the end of the array doesn't require re-indexing/shifting memory slots for every item.

Like dynamic arrays, here are some other operations' spacetime complexities:

* Traversal and search are `O(n)` time and `O(1)` space since it's about traversing the input size
* Initialization is `O(n)` spacetime

**Note**: Linked lists also work under the hood for stacks.

## What is a Queue?

An example of a **queue** is a line of people waiting to buy tickets at a movie theatre. When someone wants to **add** themselves to the line, they go to the back of the line. Then when the theatre wants to **remove** someone from the line, they sell a ticket to someone at the front of the line.

This is known as the  **first in, first out** (FIFO) principle and is the key aspect of queues.

### Spacetime complexity of queue operations

In a lot of cases, queues use **linked lists under the hood**, where you add to the *head* of the linked list and remove from the *tail* of the linked list.

As a result, **enqueue** (insertion) and **dequeue** (removal) operations for queues are always `O(1)`, since it's a trivial operation to just replace the head or remove the tail and switch up some pointers.

Like linked lists, here are some other operations' spacetime complexities:

* Traversal and search are `O(n)` time and `O(1)` space since it's about traversing the input size
* Initialization is `O(n)` spacetime

**Note**: We don't typically use dynamic arrays for queues because insertion at the beginning isn't a constant spacetime operation. However, since many languages don't have linked lists built in, it's reasonable in interviews to *pretend* to treat them as efficient data structures for queues. *Just make sure to note that to your interviewer*.

## Peek

Stacks and queues typically have a `peek` operation implemented. It's basically `O(1)` spacetime like pop and dequeue except you only *look* at the element to be removed. You don't actually remove it.

## More Complex Stacks and Queues

* `MinStack` and `MaxStack` keep track of the smallest and largest element in it respectively
* Priority queues keep track of high-priority elements