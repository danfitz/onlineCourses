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

- Referential equality (like in dependency arrays) to prevent unnecessary re-renders
- Value stability

## `useContext`

## `useLayoutEffect`

## `useImperativeHandle`

## `useDebugValue`
