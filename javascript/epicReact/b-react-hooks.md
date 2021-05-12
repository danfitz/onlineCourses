---
title: 'React Hooks'
part: 2
date: '2021-05-11'
categories: [frontend]
tags: [js, react]
source: [epic react]
---

# React Hooks

- `useState` accepts a callback function that performs **lazy state initialization**.
  - In other words, React will only invoke that callback the first time that the component renders in order to get the initial state _one time_.
  - In contrast, by default, when you pass initial state, React will evaluate the initial state on _every_ render. This evaluation can be wasteful if the initial state is computationally expensive (e.g. getting a value from local storage).
