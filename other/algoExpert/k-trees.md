---
title: Trees
part: 11
date: '2022-05-04'
categories:
  - compsci
tags:
  - data structures
  - algorithms
source:
  - algoexpert
---

# Trees

**Trees** are a type of a graph where

* It's **rooted**, i.e., has a *root node*
* Every node has child nodes
* Each node only has one parent
* Structure is directed, i.e., edges have direction (typically pointing downwards towards children)
* Structure is acyclic, i.e., you can't return to previous nodes when traversing
* Structure is connected, i.e., every branch has to be attached to the tree

Real-world examples of trees are an org chart of a company or a family tree.

**Note**: Sometimes nodes in a tree can be set up to always have pointers back to the root node, which can be useful when you want to get back to the root quickly.

Some special terminology:

* The nodes at the bottom without any children are called **leaf nodes**
* Any path that starts at the root node and ends at a leaf node is called a **branch**
* When referring to how far down a tree goes, we call that **depth** or **height** or **levels**

## Some Types of Trees

### K-ary trees

**Binary trees** are the most common type of trees. They have all of the requirements of trees *plus* **each node can only have at most 2 child nodes** (thus why it's called binary).

Similarly, **ternary trees** basically have at most *3 child nodes per node*.

Generalizing, we call these trees **k-ary trees**, where these trees have at most *`k` child nodes per node*.

### Trees with special properties

**Binary search trees** (BSTs) are binary trees where they satisfy some special "binary search" property.

**Min heaps** and **max heaps** are also binary trees where they respectively satisfy some special "min heap" or "max heap" property.

**Tries** are trees that store characters in a string, allowing you to perform interesting operations on those characters/strings by taking advantage of the tree-like structure.

## Spacetime Complexity of Trees

## Space complexity

Storing a tree is almost always `O(n)` where `n` is the number of nodes in the tree.

## Time complexity

Traversing a tree is generally `O(n)`.

One exception though is when traversing through a binary search tree. When you search through a BST that's **balanced**, you can roughly eliminate half of the tree at every branching point. As a result, traversal is `O(log n)` for BSTs.

If, however, the binary search tree was **imbalanced** because all of the nodes were skewed to the right, you don't benefit from eliminating nodes anymore. In the worst case, the skew is so bad that the nodes form a straight line, which makes traversal `O(n)` since it's basically like traversing down a linked list.

**Pro tip**: In a coding interview, pay attention to if the binary tree is balanced. You can only be confident that traversal is, on average, `O(log n)` when it's balanced.

**Note**: There are some really fancy trees out there like red-black trees or AVL trees where they have optimizations to constantly re-balance the tree in order to maintain the logarithmic complexity. So it goes without saying that the logarithmic property is important!

## Properties of Trees

### Complete vs. incomplete

A tree is considered **complete** when

1. All of its upper levels are completely filled up with nodes
2. Its bottom level (level for leaf nodes) is filled up from left to right (does not have to be completely filled up though)
* *This just means you can't have gaps between leaf nodes, and you can't have empty space at the left-hand side of the bottom level*

Otherwise, a tree is considered **incomplete**.

### Full

A tree is considered **full** when each node either has

* exactly `k` child nodes (for k-ary trees), OR
* No child nodes.

Basically, every slot is filled up!

### Perfect

A tree is considered **perfect** when all the leaf nodes are at the same depth/level. In other words, the bottom level is completely filled up.

Visually, that means the tree is shaped like a triangle!