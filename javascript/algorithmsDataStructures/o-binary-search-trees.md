---
title: 'Binary Search Trees'
part: 15
date: '2020-04-09'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

# Binary Search Trees

## What is A Tree?

A **tree** is a data structure consisting of *nodes* in a **parent-child** relationship. The resultant structure is a series of *branches* that split to varying degrees.

Terminology:

* **Root**: The top node
* **Child**: A node directly connected to another node when moving *away* from the root
* **Parent**: The reverse notion of a child
* **Siblings**: Nodes with the same parent
* **Leaf**: A node with no children
* **Edge**: The *connection* between one node and another

### What is NOT a tree?

* Trees must not have its siblings pointing to each other
* Trees must not have children pointing to parents
* Trees must not have *more than one* root parent node

### Uses for trees

* HTML DOM
  * Elements have children, which may have children, and so on
* Network routing
  * Sending information across a network
* Abstract syntax trees
  * When code is read, many languages create a tree of syntax commands to make it easier to validate and/or parse the code
* Artificial intelligence
  * When an AI plays a game, it sometimes utilizes a minimax tree (a kind of decision tree), which is a traversal of every possible move the AI could make, helping it decide which move guarantees a win
* Folders in operating systems

### Comparing trees to lists

Lists are **linear**: they have a single path. Trees are **nonlinear**: you can follow multiple different paths.

Think of a singly linked list as a special case of a tree: a tree with only one branch.

## Binary Search Trees

**Note**: There are dozens of kinds of trees, but we'll only focus on binary search trees.

**Binary trees** are trees where its nodes can have, at most, **2 children**.

**Binary search trees (BSTs)** are special cases of binary trees where they are *sorted* in a particular way to make it easy to **search** for nodes.

Because of the need to sort the tree, the data in a binary search tree needs to be **sortable via comparison**.

### How sorting works

The basic idea behind sorting in BSTs is this: every value *less than* the target node is on the left side of the tree, and every value *greater than* the target node is on the right side.

### How searching works

With your BST sorted, you just ask: is my intended value larger or smaller than the current node? If it's smaller, you can effectively eliminate *half* of the nodes in your tree and focus your attention on only the left node.

You simply do this over and over as you go down the tree until you find your value (or reach a leaf).

## Implementation

### Classes

This is enough to get started:

```js
class BinarySearchTree {
  constructor() {
    this.root = null
  }
}

class Node {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}
```

### Insert

**Insertion** depends on performing *comparison* in order to find the right place to add a new node.

Here's the pseudocode:

1. Create a new node.
2. If there is no root, the node becomes the root.
3. If there is a root, check if the value is smaller or larger.
4. If it's smaller, repeat steps 2 and/or 3 except for the left node.
5. If it's larger, repeat steps 2 and/or 3 except for the right node.
6. Return the tree when you find a place for the new node.

```js
// Iterative solution
insert(val) {
  const node = new Node(val)

  let ref = this
  let position = 'root'

  while (ref[position] !== null) {
    if (node.val < ref[position].val) {
      ref = ref[position]
      position = 'left'
    } else if (node.val > ref[position].val) {
      ref = ref[position]
      position = 'right'
    } else { // <= equality
      return
    }
  }

  ref[position] = node
  return this
}

// Recursive solution
insert(val, current=this.root) {
  const node = new Node(val)
}
```

**Pro tip**: There's 2 common approaches to handling duplicate values:

* You can ignore it and just return undefined (like in the code above).
* You can add a `count` property to your node that increments when duplicates are found.

### Find

**Finding** a node in a BST is basically the same idea as inserting:

1. Start at the root.
2. If there is no root, you're done.
3. If there is a root, compare the value you're searching for with the root node.
4. If it's equal, return the node.
5. If it's smaller, repeat steps 2-4 for the left node.
6. If it's larger, repeat steps 2-4 for the right node.

```js
find(val) {
  let current = this.root

  while (current && val !== current.val) {
    if (val < current.val) {
      current = current.left
    } else {
      current = current.right
    }
  }

  return current ? current : undefined
}
```

## Big O

Typical of binary search, `insert` and `find` are both `O(log n)` in the *best* and *average* case. That's because each comparison, on average, eliminates half of the nodes that need to be searched through.

However, in the *worst* case, you could have a one-sided binary search tree where all values are on the right (or left). In this scenario, `insert` and `find ` would be `O(n)`.