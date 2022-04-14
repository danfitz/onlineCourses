---
title: 'Linked Lists'
part: 6
date: '2022-04-13'
categories: [compsci]
tags: [data structures, algorithms]
source: [algoexpert]
---

# Linked Lists

## How linked lists work under the hood

**Linked lists** are very similar to arrays in that they have an order, but they don't require contiguous memory slots to achieve that order.

Rather, individual elements can be stored *anywhere* in memory as **nodes**, and their order is preserved using **pointers**. So, the first node could start at memory address 1, then point to the next node at memory address 15, which then points to the next node at memory address 28, and so on.

**Note**: Nodes take up *extra* memory slots because they must store the value *plus* the pointer to the next node.

## Linked list operations and their spacetime complexity

* Getting an item
  * `O(n)` time (worst case) or `O(1)` time (best case)
    * Because a linked list's nodes can be anywhere in memory, you have to traverse through potentially the entire list before you find your target node
  * `O(1)` space
    * Because no extra space is required
* Setting/overwriting an item
  * `O(n)` time (worst case) or `O(1)` time (best case)
    * Same reasons as getting an item: you have to first find the node before you can set its value
  * `O(1)` space
    * Because no extra space is required
* Initializing linked list
  * `O(n)` time (because amount of memory slot assignment increases linearly with `n`)
  * `O(n)` space (because amount of memory slots required increases linearly with `n`)
* Traversing linked list
  * `O(n)` time (because the amount of iterations required increases linearly with `n`)
  * `O(1)` space (because you're not storing anything new when traversing)
* Copying linked list
  * `O(n)` time (because you have to traverse the linked list to copy all of its contents)
  * `O(n)` space (because you're asking the operating system to store a brand new copy)
* Removing an item at the end of an array
  * `O(1)` time (because you just take the value out of the end of the series of memory slots)
  * `O(1)` space (because you're just moving the value to another location in memory)
* Removing an item at the beginning or middle of an array
  * `O(n)` time (because the operating system has to shift the position of every other element in the array to fill the gap)
  * `O(1)` space (because you're just moving the value to another location in memory)

## Spacetime complexity of insertion

Because linked lists are not contiguous and so don't require shifting potentially every element during an insertion, insertion is generally much simpler for linked lists.

Space complexity is `O(1)` for the obvious fact that you're just adding 1 new node into memory.

For insertion, time complexity is a bit more complex. To understand this better, here are the steps to insert a node:

1. Find the position where you want to insert the new node
2. Add a new node anywhere in the memory canvas
3. Given the position, set the pointer of the new node to the next node
4. Given the position, update the pointer of the previous node to the new node

Steps 2, 3, and 4 are all constant time operations.

However, step 1 is `O(1)` *only if* you have a direct reference to the position. This depends on your linked list implementation. A common scenario is that linked lists have a direct reference to the **head** (start) or **tail** (end), so insertion at the beginning or middle is `O(1)`.

If you don't have a direct reference to the target position, time complexity is `O(n)` because you have to traverse to find the node at the target position!

## Spacetime complexity of removal

Spacetime complexity is pretty much the same as insertion.

## Singly vs. doubly linked lists

**Singly linked lists** only have nodes with one pointer, all of them pointing in the same direction. As a result, you can only traverse in one direction.

**Doubly linked lists** have nodes with two pointers, one for each neighbour of a node. As a result, you can traverse in both directions.

By convention, we call these pointers `prev` and `next` in our node implementations, where `next` is the only available option for singly linked lists.

## Circular linked lists

One type of linked list that's worth briefly mentioning is **circular linked lists**. They're circular because the "tail" points to the "head", forming a closed circle of pointers.