---
title: 'Building Lists'
part: 2
date: '2021-01-18'
categories: [frontend, mobile]
tags: [react native]
source: [udemy]
---

# Building Lists

## The `FlatList` Element

The `FlatList` primitive element takes an **array** of items and turns it into a list of elements.

`FlatList` takes 2 props:

- `data`: accepts array
- `renderItem`: function that turns each item into an element

**Note**: React Native prefers `FlatList` over the generic `map` method because it adds performance optimizations for list rendering on mobile.

### Using `FlatList`

Here's how `FlatList` looks in code:

```js
const ListScreen = () => {
  const friends = [
    { name: 'Friend #1' },
    { name: 'Friend #2' },
    { name: 'Friend #3' },
    { name: 'Friend #4' },
    { name: 'Friend #5' },
    { name: 'Friend #6' },
    { name: 'Friend #7' },
    { name: 'Friend #8' },
  ];

  return (
    <FlatList
      data={friends}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
};
```

Notice how the element passed into `renderItem` is not exactly each object in the `friends` array. React Native adds a bunch of extra properties to each object, and it places your item in the `item` property. (Most of the time you only really care about the `item` property.)

## The `key` Property

### Why use the `key` property

Without a `key` property, React Native can't keep track of items in a list. That means if you change one element in an array, React Native has to re-render _every_ element. The `key` property is required for performance optimization.

### How to add the `key` property

There are 2 ways to add a `key` property each element in a `FlatList`:

1. Include a `key` property in each object in your input array.
   - `{ name: 'Friend #1', key: '1' }`
   - The only requirement here is that `key` must be a **string**.
   - Each `key` must be **unique**.
2. Use `keyExtractor` prop in `FlatList`
   - This function receives each item in your array, and you're expected to return a **unique string** representing the `key`.

```js
<FlatList
  keyExtractor={friend => friend.name}
  data={friends}
  renderItem={({ item }) => <Text>{item.name}</Text>}
/>
```

**Pro tip**: We will generally prefer the `keyExtractor` approach because you generally don't want your view-related data mixed up with actual data.

## A Few Props in `FlatList`

`FlatList` gives us a few more useful props that you should know:

- `horizontal` makes the list render horizontally.
- `showsHorizontalScrollIndicator` can hide or display the scrollbar that appears when you scroll horizontally
