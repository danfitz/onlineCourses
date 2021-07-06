---
title: 'Advanced React Hooks'
part: 3
date: '2021-05-19'
categories: [frontend]
tags: [js, react]
source: [epic react]
---

# Advanced React Hooks

## `useReducer`

We know that `useReducer` accepts a reducer and an initial state as its first 2 arguments.

However, you can also pass a 3rd `init` callback function that takes the initial state and performs **lazy initialization** for that initial state.

This is useful for the same reasons as lazy initialization in `useState`: to save computational expenditure.

```js
const [state, dispatch] = useReducer(
  reducer,
  initialState,
  function init(state) {
    // Do stuff with initial state at the beginning
  }
);
```

## `useCallback`

There are 2 situations where the memoization behind `useCallback` is useful:

- Improve performance by avoiding expensive computations (like re-rendering expensive components or calling expensive functions)
- Value stability

As an example, every time a component re-renders, if it has a nested function inside, that function will have a new reference!

```js
const Component = props => {
  const handleClick = () => {
    // Do stuff
  };

  return <button onClick={handleClick}>Click me</button>;
};
```

That means the child component will re-render as well, even if nothing changed!

If you want to avoid those unnecessary re-renders, you can memoize `handleClick` to add in **value stability**.

```js
// Note that you have to memoize the child component, so
// it only re-renders when its props change
const MemoizedButton = React.memo(props => <button {...props} />);

const Component = props => {
  const handleClick = useCallback(() => {
    // Do stuff
  }, []);

  return <MemoizedButton onClick={handleClick}>Click me</button>;
};
```

Now `handleClick` will always have the same reference (it has value stability), which means `MemoizedButton` won't go through unnecessary re-renders.

**Pro tip**: In a lot of cases, optimizing for these performance improvements aren't worth it. You're introducing complexity for your team for sometimes very minor improvements. Additionally, the memoization can come with a cost.

```js
// This function runs less code...
const handleClick = () => {};

// than this function  because:
// * You're still defining a function
// * You have to create a dependency list
// * AND you have to invoke `useCallback`
const myFunction = () => {};
const handleClick = useCallback(myFunction, []);
```

### Value Testability

## `useContext`

### Default value

When you `createContext`, you can pass an initial default value. This is useful if someone is trying to access your context _outside_ of the provider, so no value has been provided yet.

**Note**: It's most likely a mistake to try to access context outside of a provider, but it's good to know anyways.

### Composition model

A common use case for context is to avoid prop drilling.

However, before jumping to using context, remember that [Facebook recommends](https://reactjs.org/docs/context.html#before-you-use-context) using the [**composition model**](https://reactjs.org/docs/composition-vs-inheritance.html) first.

[Here's an in-depth demonstration video](https://www.youtube.com/watch?v=3XaXKiXtNjw) showing how the composition model works.

### Scoping context

One of the benefits of context providers is that you can choose which parts of the React component tree have access to your context. You don't have to make it _globally_ available. You can choose to limit context to a _branch_ of the tree instead.

## `useLayoutEffect`

## `useImperativeHandle`

## `useDebugValue`
