---
title: 'Doubly Linked Lists'
part: 14
date: '2020-03-20'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

# Doubly Linked Lists

The only difference between a **doubly linked list** and a singly linked list is that you **add a pointer** to the previous node as well.

This makes operations like `pop` much faster because you can **traverse backwards**.

However, as a result of this extra pointer, doubly linked lists take up **more memory**.

## Constructors

```js
class Node {
  constructor(val) {
    this.val = val
    this.prev = null
    this.next = null
  }
}

class DoublyLinkedList {
  constructor() {
    this.length = 0
    this.head = null
    this.tail = null
  }
}
```

## Operations

### Push

```js
push(val) {
  const newNode = new Node(val)

  if (length === 0) {
    this.head = newNode
  } else {
    this.tail.next = newNode
    newNode.prev = this.tail
  }

  this.tail = newNode
  this.length++
  return this
}
```

### Pop

```js
pop() {
  if (this.length === 0) return undefined

  const poppedNode = this.tail

  if (this.length === 1) {
    this.head = null
    this.tail = null
  } else {
    this.tail = poppedNode.prev
    this.tail.next = null
  }

  poppedNode.prev = null
  this.length--
  return poppedNode
}
```

### Unshift

```js
unshift(val) {
  const newNode = new Node(val)

  if (this.length === 0) {
    this.tail = newNode
  } else {
    this.head.prev = newNode
    newNode.next = this.head
  }

  this.head = newNode
  this.length++
  return this
}
```

### Shift

```js
shift() {
  if (this.length === 0) return undefined

  const shiftedNode = this.head

  if (this.length === 1) {\
    this.head = null
    this.tail = null
  } else {
    this.head = shiftedNode.next
    this.head.prev = null
  }

  shiftedNode.next = null
  this.length--
  return shiftedNode
}
```

### Get

### Set

### Insert

### Remove