---
title: 'Intro to Jest, Enzyme, and TDD'
part: 1
date: '2020-03-22'
categories: [tools]
tags: [js, testing]
source: [udemy]
---

Course outline:

1. Intro to Jest and Enzyme
2. Testing a simple React app (just using state)
3. Redux
  * Testing connected Redux components
  * Testing action creators and reducers
4. Testing Redux Thunk and Axios>
5. Testing Redux Props and Action Creator Calls
6. Hooks and Context (no redux)
  * Testing useState, useEffect, and useReducer
  * Testing simple context (app-level state)
  * Testing context with embedded state from provider

# Intro to Jest, Enzyme, and TDD

The goal of this course is to teach you how to write **unit and integration tests** for React, Redux, hooks, and contexts using Jest and Enzyme.

react: 16.9.0

jest: 24.8.0

enzyme: 3.10.0

redux: 4.0.4

react-redux: 7.1.1

## Test-Driven Development

The basic idea behind **test-driven development** is to write tests *before* the code.

This involves 3 steps:

1. Write a *shell* function that you can call in your tests but which doesn't do anything.
2. Write tests. By default, when you run them, you want them all to fail.
3. Write the code that, one by one, make your tests pass.

This is also known as **red-green testing**: start all your tests in a red state and move them to green.

**Pro tip**: Always be suspicious of tests that you've never seen fail. You *want* to see that a test *can* fail.

### Benefits of TDD

1. Without TDD, any time you make changes, there's work you have to do to re-test the changes. With TDD, tests are already made for you, and you juse re-run them *for free*.
2. You write better code.
  * Code is *planned* before written.
  * Code doesn't need to be refactored *to be made testable*. It's already written with testing in mind.
  * Fewer bugs because they're caught sooner.
  * You also take advantage of **regression testing**: the fact that old tests get re-run every time you make changes.
  * You have high **code coverage**--the percentage of source code that gets executed during testing--and therefore low chances of bugs slipping by undetected.

## Jest

### Watch mode

Adding a `--watch` flag when running jest keeps it running. Any time you make changes, it will re-run the relevant tests automatically in the terminal.

**Note**: Jest watches for changes based on changes since your *last commit*. That means it doesn't re-run *every* test but only the tests tied to the uncommitted files.

### Test files

By default, jest knows a file is a test file if it ends with `.test.js`.

The basic structure of a test is this:

```js
test('message about what you expect', () => {
  expect(a).toEqual(b) // jest assertion
})

test('this test will fail', () => {
  throw new Error
})
```

Jest determines a test to be a failure if an **error is thrown** during the execution of the callback.

## Enzyme

Enzyme creates a **virtual DOM** for testing, which you need if you'll be doing testing *without* a browser.

Using `ReactDOM` under the hood, enzyme exposes an API with the following features:

* jQuery-style selectors
* Simulate simple events (examples: click, blur)
* **Shallow rendering**: renders components one level deep at the parent with empty placeholders for children
  * Important to isolate your tests to the component itself (and not its children)
* Access to props and state of component

### Configuration

Enzyme with react and jest requires `enzyme`, `enzyme-adapter-react-16` (if v16), and `jest-enzyme`.

Then you configure enzyme:

```js
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

// Now Enzyme knows it's dealing with react
Enzyme.configure({ adapter: new EnzymeAdapter() })
```

### How to test

To render a component, you use the `shallow` function, which returns what's called a **shallow wrapper**:

```js
import { shallow } from 'enzyme'

test('jest test', () => {
  const wrapper = shallow(<Component />)

  // Prints a string representation of the virtual DOM
  console.log(wrapper.debug())
})
```

## Types of Test

* **Unit tests** test *one* particular piece of code (usually a function), making it very modular and isolated
* **Integration tests** test how multiple units work *together*
* **Acceptance or end-to-end tests** test how a user would actually *interact* with the app from start to finish

With jest and enzyme, this course focuses on unit tests and integration tests.

## Testing Tradeoffs

When making tests, you want to keep these 2 goals in mind:

1. Tests should be **easy to maintain**
2. Failed tests should be **easy to diagnose**

### Maintainability

In particular, tests should test **behaviour**, not implementation. That means when we refactor code, we usually don't have to rewrite the tests. Tests that have to be rewritten on refactor are called **brittle**.

For example, say that you want to test that an increment button increments a counter when clicked. Testing *implementation* might be testing if a particular function is invoked on button click. Testing *behaviour* would be testing if the button click displays an updated value in the DOM.

### Easy diagnosis

Suppose that you're testing a shopping cart form where users can build their own custom t-shirt order: t-shirt style, size, colour, quantity, etc. A *difficult-to-diagnose* test would test the full results of the form *after submission*. However, this only tells you *that* something went wrong, but which step exactly? Now you have to spend time investigating. In contrast, an *easy-to-diagnose* test might check the internal state after each user action.

### Tradeoffs

There is an innate tension between maintainability and easy diagnosis:

* In order to easily diagnose *what* went wrong, your tests need to be more **granular**, which makes your tests focus more on implementation like function calls or state.
* On the other hand, in order to minimize how often tests need to be refactored, you need to make your tests **broad**, which makes it harder to spot exactly what caused failure.

