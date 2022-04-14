---
title: Hash Tables
part: 7
date: '2022-04-14'
categories:
  - compsci
tags:
  - data structures
  - algorithms
source:
  - algoexpert
---

# Hash Tables

A **hash table** is essentially a **key-value store**, mapping keys to value.

## How Hash Tables Work Under the Hood

Under the hood, hash tables are **built on top of arrays**. The key difference with a hash table is that for some programming languages, you can use _any data type_ to access a value: strings, booleans, even objects. Whereas arrays have to use indices, which are integers. How do we extend arrays to support hash table functionality?

Here's how hash tables roughly work:

1. Given hash table `{ "abr": 1, "bar": 2, "baz": 3 }`, the operating system allocates enough memory for an array of 3 references to 3 linked lists.
2. Using a **hash function**, each key is converted to an integer.
3. Using the modulo operator, we get the remainder of the integer, so we know the index to place the key's value.
   * For example, if `"abr"` converts to `602`, then `602 % 3 = 2`, and so we place the value `1` at index 2.
4. In the linked list referenced at that given index, the key's value is inserted as a node where it also _points back to the original unhashed key_. This is required so we know how to find a value using its key.
5. If an index **collision** occurs between two hashed keys (like if `"abr"` and `"baz"` both convert to `602`), the linked list now contains both values.

Here's how a linked list might look under the hood:

```
[
  0: (value1, key1) -> null
  1: (value2, key2) -> (value3, key3) -> (value4, key4)
  2: (value5, key5) -> null
  3: (value6, key6) -> null
  4: null
  5: (value7, key7) -> (value8, key8)
  6: (value9, key9) -> null
]
```

## Time Complexity of Insertion, Deletion, and Access

In the worst case, you can imagine a scenario where _every_ hashed key collides. That would mean every value is placed in the exact same linked list. As a result, if you wanted to insert, delete, or access a key-value pair, you would potentially have to traverse a linked list equal to the size of the hash table! Therefore, we say the worst-case time complexity of hash table insertion/deletion/access is `O(n)`.

However, the average-case time complexity is `O(1)` because the hash functions we use to convert keys to integers are so effective that collision is _very rare_. As a result, in coding interviews, it's typically just taken for granted that the time complexity is `O(1)` (unless the interviewer is explicitly demanding `O(1)` operations in 100% of cases).

**Note**: You might think hash functions are complex operations that could have negative complexity ramifications. But it's generally accepted in the industry that hash operations are so effective that they're basically `O(1)`.

## Resizing in Hash Tables

Suppose you start with a hash table of size 3: `{ "hello": 1, "okay": 2, "bye": 3 }`. We know the operating system allocates an array of 3 linked lists.

Now suppose you insert 100 more key-value pairs. If the array doesn't change in size, collision of these 100 new values is inevitable as they are inserted into one of only 3 available linked lists. As a result, we might begin approaching `O(n)` time complexity.

This problem is exactly why hash tables might implement **resizing**. Here is roughly how a hash table _might_ resize itself (similar to dynamic arrays):

1. Hash table allocates enough memory slots for the 3 key-value pairs initialized in `{ "hello": 1, "okay": 2, "bye": 3 }`.
2. As you insert more key-value pairs, once the hash table reaches a threshold, it copies itself into a new array that is double the size; let's say length 6.
3. Every key-value pair is rehashed and re-assigned a new index in the new array because the length has changed to 6.

**Important**: Using the same [amortized analysis in the notes on arrays](e-arrays.md#spacetime-complexity-of-dynamic-array-insertion), we know that this resizing that happens periodically doesn't change the fact that the average-case time complexity is still `O(1)`.

## Spacetime Complexity of Initialization

The time complexity of initializing `n` key-value pairs is `O(n)` since you're iterating through each key-value pair.

The space complexity is also `O(n)` since you're storing `n` values in memory. We don't really care about the keys.

**Note**: We don't really care about the space ramifications of the keys because very often they aren't stored in our hash table. Rather, pointers are created that point to the location of the original key in memory.

## A Note on Keys

Some programming languages support almost _any data type_ as keys: strings, integers, booleans, objects, functions, etc. This makes sense because as long as the hash function can convert the data type to an integer, then it works for the purpose of hash tables.
