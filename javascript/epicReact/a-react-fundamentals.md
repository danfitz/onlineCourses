---
title: 'React Fundamentals'
part: 1
date: '2021-05-06'
categories: [frontend]
tags: [js, react]
source: [epic react]
---

# React Fundamentals

- It makes sense that JSX must always have a parent container when you think about how it compiles down to `React.createElement`. How can you have two `React.createElement` calls side by side?
- Babel is actually written in JS, so you can interestingly compile your JSX by placing `type="text/babel` in your `<script />` tag.
- The `className` prop is named such because the DOM API names it that way too!
- The `style` prop accepts camel-cased properties because the DOM API works that way too!
- When you interact with React's events, it actually returns a `SyntheticEvent` created inside React. It's not coming from the actual DOM (but is pretty darn close).
  - React does this for performance reasons (e.g. event delegation).
  - If you need to access the native event, just type `event.nativeEvent`.
