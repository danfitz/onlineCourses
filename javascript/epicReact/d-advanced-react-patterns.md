---
title: 'Advanced React Patterns'
part: 4
date: '2021-07-20'
categories: [frontend]
tags: [js, react]
source: [epic react]
---

# Advanced React Patterns

## Context Module Functions

**Context module functions** are basically helper functions you build to provide a more clean API for users who consume your custom contexts.

For example, suppose you have a `CounterProvider` where a common use case is to `increment` and `decrement` the `count` inside of that context.

You could write context module functions like this...

```js
const CounterContext = React.createContext();

const CounterProvider = ({ initialCount = 0, ...props }) => {
  const [count, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'increment':
        return state + 1;
      case 'decrement':
        return state - 1;
    }
  }, initialCount);

  // Context module functions!
  const increment = () => dispatch({ type: 'increment' });
  const decrement = () => dispatch({ type: 'decrement ' });

  const value = { count, increment, decrement };

  return <CounterContext.Provider value={value} {...props} />;
};

const MyCount = () => {
  const { count, increment } = React.useContext(CounterContext);

  return (
    <>
      <p>{count}</p>
      <button onClick={increment}>increment</button>
    </>
  );
};
```

However, there are few limitations with the above approach:

- You can't place `increment` and `decrement` into dependency lists for `useEffect` or `useCallback` _unless_ you memoize them by wrapping them in `useCallback`. Otherwise, the function reference will change on every re-render, leading to unintended side effects.
- Because the context module functions live _inside_ of `CounterProvider` (or in a `useCounter` hook you could create), you can't **tree shake**, **code split**, or **lazily load** them.

To solve this problem, your context module functions can accept `dispatch` as as an argument, so it can live outside of your React components.

```js
const CounterContext = React.createContext();

const CounterProvider = ({ initialCount = 0, ...props }) => {
  const [count, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'increment':
        return state + 1;
      case 'decrement':
        return state - 1;
    }
  }, initialCount);

  const value = [count, dispatch];

  return <CounterContext.Provider value={value} {...props} />;
};

// Context module functions!
const increment = dispatch => dispatch({ type: 'increment' });
const decrement = dispatch => dispatch({ type: 'decrement' });

const MyCount = () => {
  const [count, dispatch] = React.useContext(CounterContext);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => increment(dispatch)}>increment</button>
    </>
  );
};
```

In this pattern, you continue to give the user direct access to `dispatch` in context. However, to make their lives easier, you provide them with common operations in the form of context module functions.

These functions accept `dispatch` as an argument, so they can interact with context without being directly involved with it (like defined inside of a provider or custom hook).

In doing so, these helper functions don't have to worry about memoization, and they can be easily tree shaken, code split, and lazily loaded as well!

## Compound Components

## Flexible Compound Components

## Prop Collections and Getters

## State Reducers

## Control Props
