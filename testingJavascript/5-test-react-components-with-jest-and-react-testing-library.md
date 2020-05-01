---
title: 'Test React Components with Jest and React Testing Library'
part: 5
date: '2020-04-30'
categories: [tools]
tags: [js, testing]
source: [egghead]
---

# Test React Components with Jest and React Testing Library

This section shows you the principles and practices to test how you're putting your DOM on the screen. The goal is to give you the confidence to ship your app with peace of mind. We'll be focusing on React, Jest, and React Testing Library, but these ideas can apply to any framework.

## Basic React Testing

We can actually test our React components using `ReactDOM.render` directly. This is a solution that doesn't depend on more testing libraries.

1. Create a `div`.
2. Renders your React component inside the `div`.
3. Use DOM query methods and node properties to test the DOM elements rendered.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import TextInput from './TextInput';

test('renders label and input', () => {
  const labelText = 'Input Text Here';

  // 1.
  const div = document.createElement('div');
  // 2.
  ReactDOM.render(<TextInput label={labelText} />, div);

  // 3.
  expect(div.querySelector('label').textContent).toBe(labelText);
  expect(div.querySelector('input').type).toBe('text');
});
```

### Adding Jest DOM library

The trouble with our naive solution above using basic Jest and `ReactDOM.render` is that our error messages during testing are not that semantically useful.

The way to get clearer error messages is to extend the possible Jest assertions by introducing **Jest DOM**. This library adds custom test matchers specifically used for DOM testing.

```js
// Import custom matcher and extend `expect`
import { toHaveAttribute, toHaveTextContent } from '@testing-library/jest-dom';
expect.extend({ toHaveAttribute, toHaveTextContent });

// ...

expect(div.querySelector('label')).toHaveTextContent('Favorite Number');
expect(div.querySelector('input')).toHaveAttribute('type', 'number');
```

Now our test is more useful:

- If the DOM node doesn't exist, you'll receive a meaningful error message telling you.
- If the element doesn't have a `type` attribute or a different `type` attribute than `number`, you'll also hear about it.

**Pro tip**: It's irritating to have to manually extend every custom matcher. We can solve this problem by importing the following:

```js
import '@testing-library/jest-dom/extend-expect';
```

(You can even configure your project to have Jest automatically import the extension before running any test.)

### Adding DOM testing library

In its current form, our test has a few issues:

1. We are searching specifically for `'Favorite Number'` as the label text. The user doesn't care about letter case and exact wording. This is too tightly coupled to implementation details.
2. If the label's `for` and input's `id` are different, this will break the application for screen readers, yet the test will pass.

To solve this, DOM testing library introduces some neat approaches to testing the DOM:

### Refactor 1: programmatically associating label and input

We will be using `queries.getByLabelText` to enforce a connection between the label and input.

```js
import { queries } from '@testing-library/dom';

// ...
const input = queries.getByLabelText(div, 'Favorite Number');
expect(input).toHaveAttribute('type', 'number');
```

What's happening here is that DOM testing library is searching for a label by text, finding the input associated to it, and returning that input.

This streamlines 2 things:

- We're automatically testing that `for` and `id` are the same.
- By finding by label text, we're automatically testing that a label with the given text exists.

### Refactor 2: regex

The user doesn't care that our label text is exactly `'Favorite Number'`, so our tests shouldn't either. We can actually pass regex to solve this problem:

```js
const input = queries.getByLabelText(div, /favorite number/i);
```

Now we capture the essentials of what the user wants without getting as bogged down in the implementation.

## Refactor 3: node-specific queries

It's awkward the assing parent element `div` into every query we use. Instead, we can pass our parent element once and destructure all the queries we need.

```js
import { getQueriesForElement } from '@testing-library/dom';

const { getByLabelText } = getQueriesForElement(div);
const input = getByLabelText(/favorite number/i);
// ...
```

## React Testing Library
