---
title: 'Binary Heaps'
part: 17
date: '2020-04-12'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

# Binary Heaps

**Heaps** are basically special kinds of trees. **Binary heaps** are special kinds of binary trees.

This section will address the following:

* Compare and contrast min and max binary heaps
* Implement basic methods on max heaps
* Talk about where heaps are used in the real world and what other data structures can be constructed from them

## Min and Max Binary Heaps

With a **max binary heap**, every parent node is *larger* than its children. With a **min binary heap**, every parent node is *smaller* than its children.

Compare this to a binary search tree, where a parent's left child is always smaller, while its right child is larger.

In other words, left and right do not matter. Only top to bottom matters.

### Rules

Here are the rules of a max binary heap:

* Every parent has at most 2 children
* The value of each parent is always *greater* than its children
* However, there is no guaranteed ordering between sibling nodes
* All nodes must be compact, i.e., every node's children must be occupied before filling out a new node
* The left child is always filled out first

**Note**: The rules for a min binary heap are the same except for the fact that the parents are always *smaller* than the children.

## Implementing a Max Heap

### Storing heaps

What data structure can we use to store a heap? We could use a tree data structure, which could require creating a `Tree` class. However, here's a simple solution that involves just using an **array**.

When storing a binary heap, just **traverse down one level at a time. At each level, add all the siblings from left to right**.

```
    10
   /  \
  9    7
 / \  / \
 5 3  2 1

becomes...

[10, 9, 7, 5, 3, 2, 1]
```

How do we retain the relationship between parents and children? This can be established *mathematically* based on the node's *current index*.

* When you want to find a node's *left child*, here's the formula: `2i + 1`.
  * **Example**: To find the left child of `9`, it is `2 * 1 + 1 = 3`, which is `5`.
* When you want to find a node's *right child*, here's the formula: `2i + 2`.
  * **Example**: To find the right child of `9`, it is `2 * 1 + 2 = 4`, which is `3`.
* Finally, when you want to find a node's *parent*, here's the formula: `Math.floor((i - 1) / 2)`.
  * **Example**: To find the parent of `3`, it is `Math.floor((4 - 1) / 2) = 1`, which is `9`.

**Note**: This works because (a) every level has double the number of nodes than the previous level, and (b) we can expect all child nodes to be occupied.

### Defining our class

Because we have a mathematical way to just use an array for our max binary heap, we don't need any special pointers like `left` or `right` or even a `Node` class. All we need is this:

```js
class MaxBinaryHeap {
  constructor() {
    this.values = []
  }
}
```

`this.values` store our max binary heap, which of course initializes as an empty array.

### Insert method

The insert method for a max binary heap consists of 2 steps:

1. Push value to the end of the array, adding it to the next open slot
2. **Bubble up** the value
  * Compare the value to its parent
  * If the value is larger, swap them at their indices
  * Do this again for the next parents until a parent is larger *or* you reach the root

```js
insert(val) {
  // 1. Push value to end of array
  this.values.push(val)


  // 2. Bubble up
  let index = this.values.length - 1
  while (index > 0) {
    const parentIndex = Math.floor((index - 1) / 2)
    const parent = this.values[parentIndex]

    // If value is greater than parent, swap them
    if (val > parent) {
      this.values[index] = parent
      this.values[parentIndex] = val

      index = parentIndex
      continue
    }

    // Otherwise, exit loop
    break
  }

  return index
}
```

### Extract max method

Stuff goes here

## Importance of Binary Heaps in the Real World

Binary heaps are powerful in the real world because they're often used to

* Create a **priority queue**
  * A queue where nodes are ranked by their importance level and then automatically placed in the correct spot based on their importance
* Implement **graph traversal algorithms**