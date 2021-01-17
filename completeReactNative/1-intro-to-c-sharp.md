---
title: 'Working with Content'
part: 1
date: '2021-01-17'
categories: [frontend, mobile]
tags: [react native]
source: [udemy]
---

# Working with Content

## Overview of React Component

Every React component tends to have the following parts:

1. Import of libraries required to create the component
2. The component itself–a function that returns some JSX
3. A stylesheet to style the component
4. Export of the component, so it can be used elsewhere

```js
import React from "react";
import {Text, StyleSheet} from "react-native";

const Component = () => {
  return <Text style={styles.text}>Hello!</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default Component;
```

**Things to note**:

* `Text` is an example of a **primitive React element**. Others include `View`, `Image`, and `Button`.
* You don't *have* to pass your `styles` object through `StyleSheet.create`. You could directly pass inline styling to
  each of your components. `StyleSheet.create` is only used because it gives helpful error messages when things go
  wrong.

## Showing a Custom Component

To display a custom component, we just need to make sure it's included in one of the routes that React Native creates.

```js
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Component from './src/screens/Component';

const navigator = createStackNavigator(
  {
    Component
  },
  {
    initialRouteName: 'Component',
    defaultNavigationOptions: {
      title: 'App',
    },
  }
);

export default createAppContainer(navigator);
```

Now when you visit the app, it will be the first thing you see!

**Note**: The `react-navigation` library tools just help us handle navigation and control the screens available to the
user.

## Rules of JSX

