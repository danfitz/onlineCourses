---
title: 'Collections, Maps, and Regular Expressions'
part: 4
date: '2022-04-22'
categories: []
tags: [java]
source: [coursera]
---

# Collections, Maps, and Regular Expressions

## Collections

**Collections** are structured groups of objects provided in `java.util`. This framework provides a unified architecture for implementing collections--including interfaces. `ArrayList`s are an example of a pre-defined collection!

**Note**: `Array` on the other hand is not an implementation of a collection!

Other pre-defined collections:
* `Set` (only unique elements)
* `SortedSet` (unique and sorted)
* `List` (duplicates allows and sorted)
* `Map` (dictionary with key-value pairs)
* `SortedMap` (dictionary and sorted)

### Collections interface

Here are some methods you must implement as required by the Collections interface:

* `boolean add(E o)`
* `boolean contains(Object o)`
* `boolean remove(Object o)`
* `boolean isEmpty()`
* `boolean size()`
* `Object[] toArray()`
* `Iterator<E> iterate()`

**Note**: There are also sub-interfaces for `List`, `Set`, and `Deque`! These are subsets of collections with their own unique requirements.

### List interface

Lists are ordered collections where elements are accessed via an index.

Here's some special methods as required by the `List` interface (beyond the ones in the Collections interface):

* `void add(int index, E element)`
* `E get(int index)`
* `void set(int index, E element)`

Common use cases for implementations of `List`:
* `ArrayList` is good for fast random access
* `LinkedList` is good if frequently adding or removing elements

### Deque interface

**Deques** are ordered like a list but access only occurs at the start or end of the collection.

Here's some special methods as required by the `Deque` interface (beyond the ones in the Collections interface):

* `void addFirst(E o)`
* `void addLast(E o)`
* `E getFirst()`
* `E getLast()`

Common use cases for implementations of `Deque`:
* Use when you only need access at beginning or end
* `ArrayDeque` if thread-safe implementation not required
* `ConcurrentLinkedQueue` if required

### Set interface

**Sets** are modeled on the mathematical set, so there are no duplicates.

There are *no* special methods in `Set` interface (beyond the ones in the Collections interface).

Common use cases for implementations of `Set`:
* `TreeSet` if you need to traverse set in a sorted order
* `HashSet` if you don't, since it's more efficient

### Map interface

**Maps** are basically dictionaries with key-value pairs, where each key must be unique and maps exactly to one value.

**Important**: Maps are not part of the Collections hierarchy, so it doesn't need to implement the Collections interface.

Here's some methods as required by the `Map` interface:

* `V put(K key, V value)`
* `V get(Object key)`

Common use cases for implementations of `Map`:
* `TreeMap` if you need to access in key order
* `HashMap` if you don't, since it's more efficient

### Iterator

Every Collection implementation has an **iterator**, allowing you to loop through the collection *and* modify it at the same time.

```java
// Create Iterator object
Iterator<String> it = treeSet.iterator();

// Modify the values while traversing using the Iterator object
while (it.hasNext()) {
  if (it.next().equals("red")) {
    it.remove();
  }
}
```

**Important**: It's recommended to use the iterator if you want to iterate and modify at the *same time*. Otherwise, you're liable to get a `ConcurrentModificationException`.

## Regular Expressions