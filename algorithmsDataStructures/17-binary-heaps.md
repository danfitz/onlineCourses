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

## Importance of Binary Heaps in the Real World

Binary heaps are powerful in the real world because they're often used to

* Create a **priority queue**
  * A queue where nodes are ranked by their importance level and then automatically placed in the correct spot based on their importance
* Implement **graph traversal algorithms**