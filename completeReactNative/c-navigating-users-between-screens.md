---
title: 'Navigating Users Between Screens'
part: 3
date: '2021-01-18'
categories: [frontend, mobile]
tags: [react native]
source: [udemy]
---

# Navigating Users Between Screens

## Button Types

There are 2 types of buttons available in React Native:

1. Primitive `Button` component that detects a press
2. Highly customizable `TouchableOpacity` component that can detect a press on _any_ kind of element (text, image, etc.)

## Using `Button`

Using a `Button` is pretty simple, so the code can speak for itself:

```js
import { Button } from 'react-native';

<Button title='Click me' onPress={() => console.log("I've been clicked")} />;
```

## Using `TouchableOpacity`

`TouchableOpacity` gives you more control by wrapping around any element and _adding_ press detection to it.

```js
import { TouchableOpacity, Text } from 'react-native';

<TouchableOpacity onPress={() => console.log("I've been clicked")}>
  <Text>Click me</Text>
</TouchableOpacity>;
```

**Things to note**:

- You can wrap `TouchableOpacity` around **multiple child elements**. Clicking any one of them triggers the `onPress`.
  - Useful, for example, when you have an image and caption that you want to both be clickable.
- `TouchableOpacity` has the word **opacity** because it adds an opacity animation when the element gets pressed, giving the user feedback that a press event occurred.

## Navigating with React Navigation

`react-navigation` controls navigation using what's called a **stack navigator**. This navigator does 2 things:

1. Controls which screens/views/routes get loaded, and
2. Passes props down to those screens/views/routes.

One of the props passed down that we care about right now is `navigation`. In particular, there is a `navigation.navigate` function that accepts the route names we defined in the stack navigator itself. _This_ is the function we use to navigate `onPress`.

```js
import { Button, TouchableOpacity, Text } from 'react-native';

const Screen = ({ navigation }) => {
  return (
    <View>
      <Button title='Click me' onPress={() => navigation.navigate('About')} />
      <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
        <Text>No, click me</Text>
      </TouchableOpacity>;
    </View>
  );
};
```

**Note**: By default, when you navigate to another route, React Native adds a back button at the top left of the mobile screen to go back to the previous page.
