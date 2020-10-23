---
title: 'Singly Linked Lists'
part: 12
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
  constructor(val) {
    this.val = val
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
    const newNode = new Node(val)
    
    if (this.length === 0) {
      this.head = newNode
    } else {
      this.tail.next = newNode
    }

    this.tail = newNode
    this.length++
    return this
  }
}
```

### Pop

With a pop, your goal is to

1. Store the current tail in a variable.
2. Change the second-last element to the new tail and set its `next` to null.
3. Decrement the `length`.
4. Return the stored variable.

**Note**: In order to get to the secon-last element, you actually have to traverse from the head, making pop `O(n)`.

```js
pop() {
  if (this.length === 0) return undefined

  const poppedNode = this.tail

  if (this.length === 1) { // <= special case
    this.head = null
    this.tail = null
  } else {
    let newTail = this.head
    while (newTail.next !== null) {
      newTail = newTail.next
    }
    this.tail = newTail
    this.tail.next = null
  }

  this.length--
  return poppedNode
}
```

### Shift

Shift is simple. All you have to do is

1. Store the current head in a variable.
2. Set the head's `next` as the new head.
3. Set the saved old head's `next` to null.
4. Decrement the `length`.
5. Return the stored variable.

```js
shift() {
  if (this.length === 0) return undefined

  const shiftedNode = this.head

  if (this.length === 1) this.tail = null // <= special case

  this.head = this.head.next
  shiftedNode.next = null

  this.length--
  return shiftedNode
}
```

### Unshift

Unshift is also very simple. You just

1. Point the new node to the current head.
2. Set the new node as the new head.
3. Increment the `length`.

```js
unshift(val) {
  const newNode = new Node(val)

  if (this.length === 0) { // <= special case
    this.tail = newNode
  } else {
    newNode.next = this.head
  }

  this.head = newNode
  this.length++
  return this
}
```

### Get

The basic idea of get is to

1. Accept an index.
2. If the index is out of bounds, return `undefined`.
3. Otherwise, loop through the list until you reach the index.

```js
get(index) {
  if (index < 0 || index >= this.length) return undefined

  let counter = 0
  let targetNode = this.head

  while (counter < index) {
    targetNode = targetNode.next
    counter++
  }

  return targetNode
}
```

### Set

Set is super simple in that you can just *use* `get` and re-set the `val` property of the node it returns.

```js
set(index, val) {
  const targetNode = this.get(index)

  // Leverages logic check in get
  if (!targetNode) return false

  targetNode.val = val
  return true
}
```

### Insert

Insert accepts an `index` and `val` and adds a node at that index, pointing the node before it to the new node *and* pointing the new node to what the node before it was previously pointing at.

What makes insert unique is that you can leverage other methods!

1. If the index is less than zero or greater than the length, return false.
2. If the index is equal to the length, use `push`.
3. If the index is 0, use `unshift`.
4. Otherwise, use `get` to find the element at `index - 1`.
5. Then create a new node and set its pointer to the previous element's pointer.
6. Finally, set the previous element's pointer to the new node.
7. Increment `length` and return true.

```js
insert(index, val) {
  if (index < 0 || index > this.length) return false

  if (index === this.length) {
    this.push(val)
  } else if (index === 0) {
    this.unshift(val)
  } else {
    const previousNode = this.get(index - 1)
    const newNode = new Node(val)
    newNode.next = previousNode.next
    previousNode.next = newNode
    this.length++
  }

  return true
}
```

### Remove

Remove works just like insert but *takes away* an element:

1. If the index is less than zero or greater than or equal to the length, return undefined.
2. If the index is equal to `length - 1`, use and return `pop`.
3. If the index is equal to zero, use and return `shift`.
4. Otherwise, find the node at `index - 1`.
5. Store that node's pointer in a variable. That's your target node.
5. Set that node's pointer to its `next.next`.
6. Decrement the `length` and return the target node.

```js
remove(index) {
  if (index < 0 || index >= this.length) return undefined

  let removedNode

  if (index === this.length - 1) {
    removedNode = this.pop()
  } else if (index === 0) {
    removedNode = this.shift()
  } else {
    const previousNode = this.get(index - 1)
    removedNode = previousNode.next
    previousNode.next = removedNode.next
  }
  
  removedNode.next = null
  this.length--
  return removedNode
}
```

### Reverse

The basic idea behind reverse is to loop through your linked list and keep track of 3 nodes: the current node, the one before it, and the one after. The goal is to set the current node's pointer to the node before it. Then you shift the 3 nodes being tracked to the right.

**Note**: Before starting this loop though, you want to swap the head and tail.

```js
// Reverses in place
reverse() {
  // Swap head and tail
  let node = this.head
  this.head = this.tail
  this.tail = node

  let prev = null // <= start null to set tail to null @ first iteration
  let next
  for (let i = 0; i < this.length; i++) {
    next = node.next
    node.next = prev // <= this is where pointer is re-set
    previous = node
    node = next
  }
  
  return this
}
```

Think of reverse as looping through the list and **flipping the direction of the pointer** as it goes:

```js
// 1 => 2 => 3 => 4 => null (starting position)

// null *<=* 1 - 2 => 3 => 4 => null
// prev    node next

// null <= 1 *<=* 2 - 3 => 4 => null
//       prev   node next

// null <= 1 <= 2 *<=* 3 - 4 => null
//            prev   node next

// null <= 1 <= 2 <= 3 *<=* 4 - null
//                  prev   node next

// null <= 1 <= 2 <= 3 <= 4 (final position)
```

The pointers are now correctly reversed. You then just flip the head and tail properties for sake of record.

```js
// BONUS: Returns reversed copy
reverse() {
  const reversedList = new SinglyLinkedList()

  let counter = 0
  let currentNode = this.head
  while (counter < this.length) {
    reversedList.unshift(currentNode.val)
    counter++
    currentNode = currentNode.next
  }

  return reversedList
}
```

## Big O

**Insertion** (push and unshift) is `O(1)` because all you're doing is re-setting pointers and redefining the head or tail. In contrast, arrays are only `O(1)` for push. Unshift requires re-indexing.

**Removal** is `O(1)` (for shift) or `O(n)` (for pop). That's because pop requires following the pointers to the second-last node.

**Search** is `O(n)`. In contrast, search in arrays vary from `O(n)` (e.g. linear search) to `O(log n)` (e.g. binary search).

**Random access** is `O(n)` via `get` because you have to follow the pointers to reach your desired node. In contrast, arrays are always `O(1)` because indexing makes access super quick.

**TLDR**: Singly linked lists are best when you're realy concerned **insertion or removal times** but don't really care about random access. This is *especially* true when you care about insertion *at the beginning*.