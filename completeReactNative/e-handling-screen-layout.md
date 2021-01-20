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
