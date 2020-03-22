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

### Benefits of TDD

1. Without TDD, any time you make changes, there's work you have to do to re-test the changes. With TDD, tests are already made for you, and you juse re-run them *for free*.
2. You write better code.
  * Code is *planned* before written.
  * Code doesn't need to be refactored *to be made testable*. It's already written with testing in mind.
  * Fewer bugs because they're caught sooner.
  * You also take advantage of **regression testing**: the fact that old tests get re-run every time you make changes.
  * You have high **code coverage**--the percentage of source code that gets executed during testing--and therefore low chances of bugs slipping by undetected.

  ## Features of Jest

  ### Watch mode

  Adding a `--watch` flag when running jest keeps it running. Any time you make changes, it will re-run the relevant tests automatically in the terminal.

  **Note**: Jest watches for changes based on changes since your *last commit*. That means it doesn't re-run *every* test but only the tests tied to the uncommitted files.

  ### Test files

  By default, jest knows a file is a test file if it ends with `.test.js`.

  The basic structure of a test is this:

  ```js
  test('message about what you expect', () => {
    // Run code here
  })
  test('this test will fail', () => {
    throw new Error
  })
  ```

  Jest determines a test to be a failure if an **error is thrown** during the execution of the callback.

  **Pro tip**: **Assertions** like `expect` are just one way we can throw an error based on certain conditions.