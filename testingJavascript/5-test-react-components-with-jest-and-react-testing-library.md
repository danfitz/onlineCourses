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

1. We are searching specifically for `'Favorite Number'` as the label text, making our test tightly coupled to implementation details. The user doesn't care about letter case and exact wording.
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

It's awkward the passing parent element `div` into every query we use. Instead, we can pass our parent element once and destructure all the queries we need.

```js
import { getQueriesForElement } from '@testing-library/dom';

const { getByLabelText } = getQueriesForElement(div);
const input = getByLabelText(/favorite number/i);
// ...
```

## React Testing Library

This subsection introduces React testing library and much of its useful functionality.

### Render function

In our example above, our steps to render our component can be _abstracted_ for reuse:

```js
// Original implementation
const div = document.createElement('div');
ReactDOM.render(<Component />, div);
const queries = getQueriesForElement(div);

// Abstraction
const render = ui => {
  const container = document.createElement('div');
  ReactDOM.render(ui, container);
  const queries = getQueriesForElement(container);

  return {
    container,
    ...queries,
  };
};

// Note: We return `container` as well because it's useful in our tests.
```

This is essentially what `render` from React testing library does. Now in every component test, we can just go:

```js
import { render } from '@testing-library/react';

test('TextInput renders input element', () => {
  const labelText = 'Favorite Number';
  const { getByLabelText } = render(<TextInput label={labelText} />);
  expect(getByLabelText(labelText)).toBeDefined();
});
```

### Writing tests with debug

When writing your tests with React testing library, you have access to a function called `debug` that prints out the DOM you're testing. This is useful in the same way `console.log` is useful.

To access, `debug`, simply destructure it:

```js
test('Some test', () => {
  const { debug, getByLabelText } = render(
    <TextInput label='Favorite Number' />
  );
  debug(); // Prints out container

  const input = getByLabelText(/favorite number/i);
  debug(input); // Prints out just input inside container

  input.value = 'I am new text!';
  debug(); // Prints out input with changes
});
```

### Testing event handlers

React testing library introduces the `fireEvent` function to simulate events and trigger props like `onChange` or `onClick` in your components.

```js
// This component displays an error if your input is outside `min` and `max`
import NumberInput from './NumberInput';
import { render, fireEvent } from '@testing-library/react';

test('NumberInput displays error if number is too high', () => {
  const { getByLabelText, getByText } = render(
    <NumberInput min={1} max={9} label='My Number' />
  );

  const input = getByLabelText(/my number/i);
  fireEvent.change(input, { target: { value: 10 } });

  expect(getByText(/number is invalid/i)).toBeDefined();
});
```

**Pro tip**: The trouble with using `fireEvent` in isolation is that it doesn't perfectly mirror user behaviour. For example, when a user types text into an input element, it's not only a change event that fires. There are many events that fire: focus, key up, key down, change, etc.

The good news is that there is a `user` object that you can use to simulate user behaviour. This `user` object basically just uses `fireEvent` behind the scenes but fires many different events at once.

```js
import user from '@testing-library/user-event';

test('NumberInput displays error if number is too high', () => {
  // ...

  const input = getByLabelText(/my number/i);
  user.type(input, '10');

  // ...
});
```

### Updating props with rerender

Sometimes you want to test a component after a props update. To do this, we use `rerender`. `rerender` basically re-renders your component in the exact same container, allowing you to pass in new props in the process.

```js
const { getByLabelText, getByText, rerender, debug } = render(
  <NumberInput min={1} max={9} />
);

// Displays error
user.type(getByLabelText(/my number/i), '10');
expect(getByText(/number is invalid/i)).toBeDefined();

// Doesn't display error AFTER props update
rerender(<NumberInput min={1} max={10} />);
user.type(getByLabelText(/my number/i), '10');
expect(getByText(/number is invalid/i)).toBeNull();
```

### Asserting that something is NOT rendered

There's actually a problem with our code above: it will throw an error when you call `getByText(/number is invalid/i)`. That's because no error message is displayed _after_ our re-render, so our `getByText` will tell us that it didn't find anything by throwing an error.

The solution is to use `queryByText`. Any `query` method doesn't throw an error when it doesn't find anything. Instead, it returns `null`.

```js
const { getByLabelText, queryByText } = render(
  <NumberInput min={1} max={10} />
);
user.type(getByLabelText(/my number/i), '10');

expect(queryByText(/number is invalid/i)).toBeNull();
```

**Pro tip**: Generally, we want to use `get` methods because they throw useful error messages. If, however, we need to test that something is _not_ rendered, then `query` is your best bet.

### Testing accessibility with jest-axe

`jest-axe` extends Jest, allowing us to make assertions about the accessibility of your components. The process to test accessibility goes like this:

1. Extend Jest with custom `toHaveNoViolations` matcher.
2. Pass container for component into `axe` function to asynchronously return results of axe analysis.
3. Make assertion to test that the results don't have any violations.

```js
// This is a form that's not accessible
const Form = () => (
  <form>
    <input type='text' placeholder='Write something inside me' />
  </form>
);

// Test file
import { axe, toHaveNoViolations } from 'jest-axe';

// 1. Adds custom matcher
expect.extend(toHaveNoViolations);

test('Form is accessible', async () => {
  const { container } = render(<Form />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

Now if there _are_ accessibility violations, we will receive informative, descriptive error messages. These error messages will tell us exactly what isn't accessible, how to fix it, and how to learn more.

**Pro tip**: We can automatically extend Jest to use `jest-axe` matchers using `import 'jest-axe/extend-expect'`.

### Mocking HTTP requests with jest.mock

Suppose we have a component that asks to submit a person's name and returns a custom greeting text queried from an API.

This is how we would test it:

1. Mock the function that queries the API, telling the mock function to return a fake promise with fake data.
2. Render the component and destructure your required queries.
3. Insert a name into input.
4. Click button to submit name.
5. **First**: Test that the mock function was called in the right way (with the correct arguments and the correct number of times).
6. Wait for the fake promise to resolve by waiting for the greeting text to display in the DOM.

```js
import { render, wait } from '@testing-library/react';
import user from '@testing-library/user-event';
import GreetingLoader from '../GreetingLoader';
import { loadGreeting as mockLoadGreeting } from '../api';

// 1a. Mock module
jest.mock('../api');

test('greeting loads on click', async () => {
  // 1b. Mock resolved promise value
  mockLoadGreeting.mockResolvedValueOnce({
    data: { greeting: 'THIS IS A TEST GREETING' },
  });

  // 2. Render component and get queries
  const { getByLabelText, getByText } = render(<GreetingLoader />);

  // 3. Insert name into input
  const input = getByLabelText(/name/i);
  user.type(input, 'Mary');

  // 4. Click submit
  const button = getByText(/submit/i);
  user.click(button);

  // 5. TEST that mock function was called correctly
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary');
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1);

  // 6. TEST that the greeting text from promise EVENTUALLY renders in DOM
  await wait(() => {
    expect(getByLabelText(/greeting/i)).toHaveTextContent(
      'THIS IS A TEST GREETING'
    );
  });
});
```

There's a few things to note in our test:

- `wait` function
  - This is an async function that continually calls its callback _until_ it doesn't throw an error anymore.
  - We usually insert an assertion that _only_ passes after the promise resolves and updates the DOM.
  - **Note**: Behind the scenes, `wait` uses `act`, a function that ensures the render updates inside the component have been processed before making your assertions.
  - It also has a _timeout_ value that will throw a final error, implying that the assertion inside will _never_ pass.
- **Pro tip**: We rename the mock function into `mockLoadGreeting` just to make it clear what it's doing.
- `mockResolvedValueOnce` function
  - Takes the argument data and makes it the resolved value of the promise that `mockLoadGreeting` returns when `GreetingLoader` invokes it.

### Mocking HTTP requests with dependency injection

Some environments don't support `jest.mock`. For example, Storybook doesn't support it. In this case, here's an alternative mocking approach called **dependency injection**.

1. In your component, add a prop that accepts the real version of the function as a **default value**.
2. In your test, create a new `jest.fn` and pass it to the component as a prop.

With this coding pattern, the component doesn't need to be passed the function _all_ the time but only in the test.

```js
// component.js
import { getStuff } from './api'

import Component = ({ asyncFunction = getStuff }) => {
  // ...
}

// component.test.js
test('test something with the component', () => {
  const mockGetStuff = jest.fn()
  const queries = render(<Component getStuff={mockGetStuff} />)
})
```

### Mocking animations with jest.mock
