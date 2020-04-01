---
title: 'Doubly Linked Lists'
part: 13
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
    poppedNode.prev = null
  }

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

  if (this.length === 1) {
    this.head = null
    this.tail = null
  } else {
    this.head = shiftedNode.next
    this.head.prev = null
    shiftedNode.next = null
  }

  this.length--
  return shiftedNode
}
```

### Get

The only thing special about `get` is that because you can traverse forwards or backwards, you can conditionally traverse in either direction depending on if the index is closer to the left or closer to the right. This is a slight optimization that makes `get` `O(n / 2)`.

```js
get(index) {
  if (index < 0 || index >= this.length) return undefined

  const middle = Math.floor(this.length / 2)

  if (index <= middle) {
    let counter = 0
    let targetNode = this.head

    while (counter < index) {
      targetNode = targetNode.next
      counter++
    }

    return targetNode
  } else {
    let counter = this.length - 1
    let targetNode = this.tail

    while (counter > index) {
      targetNode = targetNode.prev
      counter--
    }

    return targetNode
  }
}
```

### Set

```js
set(index, val) {
  const targetNode = this.get(index)
  if (!targetNode) return false

  targetNode.val = val
  return true
}
```

### Insert

With `insert`, the only special thing you're doing is connecting nodes at both ends (`prev` and `next`).

```js
insert(index, val) {
  if (index < 0 || index > this.length) return false

  if (index === this.length) {
    this.push(val)
  } else if (index === 0) {
    this.unshift(val)
  } else {
    const newNode = new Node(val)
    const beforeNode = this.get(index - 1)
    const afterNode = beforeNode.next

    // Connect previous node with new node
    beforeNode.next = newNode
    newNode.prev = beforeNode

    // Connect new node with old node
    newNode.next = afterNode
    afterNode.prev = newNode

    this.length++
  }

  return true
}
```

### Remove

Just like `insert`, `remove` requires connecting the severed ends of each surrounding node.

```js
remove(index) {
  if (index < 0 || index >= this.length) return undefined

  let removedNode

  if (index === this.length - 1) {
    removedNode = this.pop()
  } else if (index === 0) {
    removedNode = this.shift()
  } else {
    removedNode = this.get(index)
    // Connect severed nodes
    removedNode.prev.next = removedNode.next
    removedNode.next.prev = removedNode.prev
    // Clear pointers
    removedNode.prev = null
    removedNode.next = null

    this.length--
  }

  return removedNode
}
```

### Reverse

```js
reverse() {
  let node = this.head
  this.head = this.tail
  this.tail = this.head

  let prev = null
  let next

  for(let i = 0; i < this.length; i++) {
    next = node.next
    node.next = prev // <= flipping pointer
    node.prev = next // <= flipping pointer

    prev = node
    node = next
  }
  
  return this
}
```

## Big O

Insertion and removal are always `O(1)` because `next` and `prev` make it easy to find the nearby node.

Search and access is still `O(n)` because you're still traversing the length of the list.

**However**: As mentioned before, the extra `prev` pointer means more space complexity.