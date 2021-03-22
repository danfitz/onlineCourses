---
title: 'Handling Screen Layout'
part: 5
date: '2021-01-20'
categories: [frontend, mobile]
tags: [react native]
source: [udemy]
---

# Handling Screen Layout

The operative question in this section is: **how do you style the layout of an app and make it look really nice**?

## Layout Systems

There are 3 different systems for handling layout styles:

1. Box object model
   - Handles sizing (height and width) of element plus the space around it (padding, border, and margin)
   - This affects the position of a single element
2. Flex box
   - Handles the positioning of multiple elements inside a common parent
3. Position
   - Handles position of single element inside a parent
   - Useful for overriding box object and flex box models

## Box Object Model

For the most part, the most useful style properties available to you are the same as the browser with a few additions:

- `marginVertical` and `paddingVertical`
- `marginHorizontal` and `paddingHorizontal`

## Flex Box

By default, flex mode is on! However, there are a few unique **default style properties** set:

- `flexDirection` is set to `column` because we're on mobile.
- `alignItems` is set to `flex-stretch` to automatically make each element stretch the full width of its container (sort of like every element being `width: 100%`).

### `alignItems`

Popular available values that you place on the parent element:

- `flex-stretch` (default)
- `flex-start`
- `center`
- `flex-end`

### `flexDirection`

Available values you place on the parent element:

- `column` (default)
- `row`

### `justifyContent`

Popular available values that you place on the parent element:

- `flex-start` (default)
- `center`
- `flex-end`
- `space-between`
- `space-around`

### `flex`

Just like `flex` in the browser, you set a numeric value on the **child element** to define how much that child element should stretch in proportion to its siblings. (The stretch goes in the same direction as `flexDirection`.)

### `alignSelf`

`alignSelf` overrides whatever `alignItems` value is in the parent element.

## Position

By default, `position` is set to `relative`. To remove an element from the element flow, you'd change it to `absolute`.

**Note**: Some flex-related styles that have been applied to the parent can still affect the positioning of a `position: absolute` element. For example, `alignItems: flex-end` will still push it to the edge of the screen.

### Top, bottom, left, and right

`top`, `bottom`, `left`, and `right` behave normally. It just moves an element X units of spacing _away_ from each edge.

**Note**: Just like the browser, you can set all these values to `0` on an `absolute` element to have the element fill its parent container.

**Bonus**: `StyleSheet` provides all the properties necessary to do this styling trick. It's in `StyleSheet.absoluteFillObject`.

```js
StyleSheet.create({
  child: {
    ...StyleSheet.absoluteFillObject,
  },
});
```

## Order of Processing When Applying Layout Rules

Here's the order of processing roughly:

1. Apply box object model rules (margin, padding, border, etc.).
2. If `position: absolute` applied:
   - Apply some flex box rules, completely ignoring siblings.
   - Apply top, left, right, and bottom.
3. If `position: absolute` NOT applied:
   - Apply all flex box rules, considering siblings.
   - Place element inside parent.
   - Apply top, left, right, and bottom.

## `SafeAreaView`

`react-navigation` provides a useful `SafeAreaView` wrapper component that automatically adds the correct spacing around your screens to prevent content from being cut off depending on the device. (For example, modern iPhones have a status bar at the top. You want your content to begin _below_ that.)

```js
import { SafeAreaView } from 'react-navigation';

// The content in this screen won't get cut off!
const HomeScreen = () => (
  <SafeAreaView>
    <Text>Home Screen</Text>
  </SafeAreaView>
);
```
