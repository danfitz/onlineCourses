---
title: 'Tree Traversal'
part: 16
date: '2020-04-10'
categories: [compsci]
tags: [js, algorithms]
source: [udemy]
---

# Tree Traversal

The basic question behind **tree traversal** is this: given any kind of tree, **how do you visit every node once**?

With any list (like linked lists or arrays), traversal is simple: go from start to finish or left to right.

There are 2 main approaches to tree traversal:

1. **Breadth-first search**: working your way horizontally through each level of the tree (i.e. siblings)
2. **Depth-first search**: working your way vertically through each branch of the tree (i.e. parents and children)

## Breadth-first Search

**Breadth-first search** depends on a **queue** to track what needs to be iterated through, using a `while` loop to continually *dequeue* nodes and *enqueue* their children until the queue is empty.

```js
breadthFirstSearch() {
 const queue = []
 const visited = []

 if (this.root) queue.push(this.root)

 while (queue.length !== 0) {
   // Dequeue
   const node = queue.shift()
   visited.push(node.val)

   // Enqueue children
   if (node.left) queue.push(node.left)
   if (node.right) queue.push(node.right)
 }

 return visited
}
```

**Pro tip**: When working with other kinds of trees, the enqueue step is what will differ.

## Depth-first Search

The basic idea of **depth-first search** is to traverse vertically down from the root to a leaf. The only difference is the *order* in which we visit the nodes.

### Pre-order

With **pre-order**, we

1. Visit a given node.
2. Traverse all the way down a node's *left* node.
1. Traverse all the way down a node's *right* node.

```js
// Recursive solution
preorderDFS() {
  const visited = []

  const traverse = node => {
    // 1. Visit
    visited.push(node.val)

    // 2 & 3. Traverse
    if (node.left) traverse(node.left)
    if (node.right) traverse(node.right)
  }

  if (this.root) traverse(this.root)

  return visited
}

//     8
//  3     10
// 2 4   9  14

// Becomes [8, 3, 2, 4, 10, 9, 14]
```

Because we visit the node *first*, the end result of pre-order DFS is that **all left node children are visited first**.

### Post-order

With **post-order**, we

1. Traverse all the way down a node's *left* node.
2. Traverse all the way down a node's *right* node.
3. Visit the given node.

```js
postorderDFS() {
  const visited = []

  const traverse = node => {
    // 1 & 2. Traverse
    if (node.left) traverse(node.left)
    if (node.right) traverse(node.right)

    // 3. Visit
    visited.push(node.val)
  }

  if (this.root) traverse(this.root)

  return visited
}

//     8
//  3     10
// 2 4   9  14

// Becomes [2, 4, 3, 9, 14, 10, 8]
```

Because we traverse down the tree *first*, the end result of post-order DFS is that **all children are visited before parents**.

### In-order

With **in-order**, we

1. Traverse all the way down a node's *left* node.
2. Visit the given node.
3. Traverse all the way down a node's *right* node.

```js
inorderDFS() {
  const visited = []

  const traverse = node => {
    // 1. Traverse
    if (node.left) traverse(node.left)

    // 2. Visit
    visited.push(node.val)

    // 3. Traverse
    if (node.right) traverse(node.right)
  }

  if (this.root) traverse(this.root)

  return visited
}

//     8
//  3     10
// 2 4   9  14

// Becomes [2, 3, 4, 8, 9, 10, 14]
```

Because we traverse then visit then traverse, the end result of in-order DFS is that **you visit nodes in a zig-zag pattern**.

## When to Use BFS or DFS

In general, the time complexity of BFS and DFS is the same: you're visiting every node once. The difference comes down to **space complexity**.

### Breadth vs. depth

If you're dealing with a very wide tree with lots of branches that spread very far out, **depth-first search is likely better than breadth-first search**.

That's because, especially as you reach the leafs of a tree, BFS will have a very long queue, which means higher space complexity. In contrast, DFS has a space complexity proportional to the depth of the tree, which ignores width.

Similarly, breadth-first search can be better for very deep trees because DFS will run into the problem of keeping every parent node in memory as it traverses down the tree.

**Pro tip**: Trees are more likely to be wide than deep, making it the more common situation to code for.

### Uses for variants of DFS

Pre-order DFS is great when you want to export a tree structure in an order that makes it easy to reconstruct: its **construction order**. (You know the intended root because the root is always the first node visited.)

```js
// If given [8, 3, 2, 4, 10, 9, 14]...

// It's easy to recreate the tree
//     8
//  3     10
// 2 4   9  14
```

In-order DFS is great for sorted trees like binary search trees because it returns everything in its **underlying order**.

```js
//     8
//  3     10
// 2 4   9  14

// Becomes [2, 3, 4, 8, 9, 10, 14]
```