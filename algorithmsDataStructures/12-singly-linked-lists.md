---
title: 'Singly Linked Lists'
part: 13
date: '2020-03-19'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

# Singly Linked Lists

1. What is a singly linked list?
2. How does it differ from arrays?
3. Defining `SinglyLinkedList` class with insertion, removal, traversal methods

## Definition

A **linked list** stores any data types in an order just like an array.

However, arrays are indexed with a number, and you can select elements at specific indices.

In contrast, linked lists just consist of **nodes** that each contain a **value** and a  **pointer** to the next node (or null for the last node).

Additionally, linked lists keep track of the **head** node, the **tail** node, and the **length** of the list.

Now a **singly** linked list means that each node is only connected *one-directionally* to the next node. (A **doubly** linked list is connected both ways.)

## Comparison to Arrays

Because arrays have indices, it's easy to perform **random access**: to request the 4th element, we just go `arr[3]`. With singly linked lists, there is no random access; we have to start at the head and follow the pointers to the 4th element.

However, one thing that singly linked lists are good at is *insertion* and *deletion*. For example, arrays have a hard time *adding to the beginning* because everything has to be re-indexed. With singly linked lists, you simply define a new node as the head and set the pointer to the first element.

## Singly Linked List Class

### Basic constructors

To start, we want to define a `Node` with a value and a reference to the next node.

```js
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

// Now we have the foundation to connect nodes
const firstNode = new Node('Hello')
firstNode.next = new Node('World')

class SinglyLinkedList {
  // This is enough to initialize
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
}

const list = new SinglyLinkedList()
```

### Push

The basic requirements of a push are that you

1. Set the new node to both head *and* tail if it's the first element.
2. Otherwise, set the current tail's `next` to the new node and then repoint the tail to the new node.
3. Finally, increment the `length`.

```js
class SinglyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  push(val) {
    const node = new Node(val)
    
    if (this.length === 0) {
      this.head = node
    } else {
      this.tail.next = node
    }

    this.tail = node
    this.length++
  }
}
```

### Pop

