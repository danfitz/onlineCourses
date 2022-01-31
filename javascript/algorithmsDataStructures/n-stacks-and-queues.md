---
title: 'Stacks and Queues'
part: 14
date: '2020-03-22'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

# Stacks and Queues

## Stacks

### What is a stack?

A stack is an abstract data structure that abides by the **last in, first out (LIFO)** principle: the last element added to a stack will be the first one removed.

A real-life example of this is a stack of plates: the last one you washed and put in the cupboard is always the first one you use!

### Use cases

* **Call stack**: used to manage function invocations
* **Undo/redo**: new actions are added to the top of the stack, and undoing those actions removes the most recent action
* **Routing history**: a history of the routes you've visited in a browser are modeled as stacks

### Array implementation

A stack is a **concept**: as long as you abide by LIFO, the data structure is considered a stack. For that reason, you could use **arrays** for stacks.

The most efficient approach is to use `push` and `pop`:

```js
// Imagine this stack is for browser history
const stack = []
stack.push('https://google.ca')
stack.push('https://youtube.com')
stack.pop() // Returns google.ca
```

**Pro tip**: The trouble with arrays is that they're *indexed*, and this means more data. If you care about efficiency and are dealing with lots of data *but* don't need features like random access, an array isn't the best implementation of a stack. After all, all you need to achieve a stack is an order of what came before. This is why linked lists are often better.

### Custom class implementation

If we want to avoid the bloat associated with arrays--like indices or all the built-in array methods--we can opt for a **linked list** implementation with 2 methods: one that adds to the list and one that removes from the list.

```js
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class Stack {
  constructor() {
    // These properties are just named this way to use the terminology of stacks
    this.first = null
    this.last = null
    this.size = 0
  }
}
```

**Note**: Recall that `pop` is `O(n)` for singly liked lists because it traverses through ever node to get to the last node. As a result, this implementation will technically use `unshift` and `shift` since they're `O(1)`, but we'll call them `push` and `pop`.

```js
push(val) {
  const node = new Node(val)

  if (this.size === 0) {
    this.first = node
    this.last = node
  } else {
    const previousFirst = this.first
    this.first = node
    this.first.next = previousFirst
  }

  this.size++
  return this.size
}

pop() {
  if (this.size === 0) return null

  const poppedNode = this.first

  if (this.size === 1) {
    this.first = null
    this.last = null
  } else { 
    this.first = poppedNode.next
    poppedNode.next = null
  }

  this.size--
  return poppedNode
}
```

### Big O

The two most important features of a stack are `push` and `pop`, which are `O(1)`.

Search and access will be `O(n)` because you have to traverse using `next`. But if you need search and access, you probably don't want to use a stack.

## Queues

### What is a queue?

A **queue** is an abstract data structure that abides by the **first in, first out (FIFO)** principle: the first element added to a queue will be the first one removed. Adding an element to the end of a queue is to **enqueue**. Removing the oldest element at the beginning of a queue is to **dequeue**.

A real-life example of this is a queue (or lineup) at a rollercoaster: the first person in line gets to go on the ride first.

### Use cases

* Waiting in line to join an online game with full participants
* Printers use a queue to track which document it will print next
* When you upload or download content, sometimes it's treated like a queue
* When you run background tasks, sometimes it's managed using a queue as well

### Array implementation

With an array, you either choose `push` + `shift` or `unshift` + `pop`. The only difference is whether you're adding at the beginning and removing from the end or vice versa.

### Custom class implementation

In a singly linked list, it's best to enqueue at the end (`push`) and dequeue at the beginning (`shift`). That's because the alternative involves removing from the end, which corresponds to a `pop`. And since `pop` in a singly linked list is `O(n)`, that would be the less time efficient choice.

The implementation of a queue is identical to `shift` and `push` in the [notes](12-singly-linked-lists):

```js
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class Queue {
  constructor() {
    this.first = null
    this.last = null
    this.size = 0
  }

  // Add at the end (like push)
  enqueue(val) {
    const node = new Node(val)

    if (this.size === 0) {
      this.first = node
      this.last = node
    } else {
      this.last.next = node
      this.last = node
    }

    return ++this.size
  }

  // Remove from the beginning (like shift)
  dequeue() {
    if (this.size === 0) return null

    const removedNode = this.first

    if (this.size === 1) {
      this.first = null
      this.last = null
    } else {
      this.first = removedNode.next
      removedNode.next = null
    }

    this.size--
    return removedNode.val
  }
}
```

### Big O

Just like stacks, our custom implementation is `O(1)` for insertion and removal, but it's `O(n)` for search and access. However, if you're going to use a queue, you shouldn't care about search and access.