---
title: 'State Management'
part: 4
date: '2021-01-19'
categories: [frontend, mobile]
tags: [react native]
source: [udemy]
---

# State Management

Main things to know: managing state (locally or via a reducer) is basically identical to React for web. In fact, they both use the `react` library, so that shouldn't be surprising. I guess the `react` library is just a very generalizable way of representing and tracking changes to a UI.

## `TextInput`

React Native provides a primitive `TextInput` component for handling text inputs.

```js
const InputScreen = () => {
  const [text, setText] = useState('');
  <TextInput
    style={{ margin: 15, padding: 15, borderColor: 'black', borderWidth: 1 }}
    value={text}
    onChangeText={setText}
    autoCapitalize='none'
    autoCorrect={false}
  />;
};
```

**Things to note**:

- There are no default styles, so `TextInput` will appear invisible by default.
- Like any input in React, you're making it a **controlled component**. The only difference is that `onChangeText` is your `onChange` callback, and it returns the new value of the input.
- On iOS by default, the first character in your input gets capitalized. To change this, you have the `autoCapitalize` prop.
- By default, words in your input get autocorrect recommendations. In cases where you don't want that (e.g. inputting a username), you have the `autoCorrect` prop.
