---
title: 'Fundamentals of Testing'
part: 1
date: '2020-04-27'
categories: [tools]
tags: [js, testing]
source: [egghead]
---

# Fundamentals of Testing

This section will create simple versions of (1) a testing framework and (2) an assertion library. The goal is to understand how these work by building our own.

## A Test Throws an Error

At its core, a test is code that **throws an error** when the *actual* result doesn't match the *expected* result.

This can get complicated when dealing with code with multiple layers of logic because there are several branching steps involved. However, a simple bit of code to test is *pure functions*: functions that always return the same output given the same input--and which don't mutate anything around them.

```js
// Function
const sum = (a, b) => a + b

// Test
const result = sum(1, 4)
const expected = 6
if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`)
}
```

In the console, this should show an error message.

## Abstracting into Assertions

To make our code more reusable, we can encapsulate and abstract our logic checks into assertion functions under `expect`:

```js
const expect = actual => {
  return {
    toBe: expected => {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`)
      }
    },
    toBeGreaterThan: expected => {
      if (!(actual > expected)) {
        throw new Error(`${actual} is not greater than ${expected}`)
      }
    }
    // More assertions can be added here...
  }
}

const result = sum(4, 5)
const expected = 7
expect(result).toBe(expected) // Throws error!
```

## Encapsulating Tests using a Testing Framework

There are 2 problems with using `expect` on its own:

1. If we have multiple tests and one fails, the ones after never get to run. That's because thrown errors halt the code.
2. When the error is thrown, by default, we're told the line number that the error was thrown. However, we aren't given precise information about *what* went wrong. If we have multiple tests, we won't know which one broke.

To solve these 2 problems, we introduce a **testing framework**. We will implement a `test` function, which solves the 2 problems in the following way:

1. Using a `try/catch`, we can catch an error and display it without halting the other tests.
2. Inside our `try`, we can state something about the test that was successful, and inside our `catch`, we can state something about the test that failed.

```js
const test = (description, callback) => {
  try {
    callback() // assertions are in here
    console.log(`SUCCESS: ${description}`)
  } catch (error) {
    console.error(`FAIL: ${description}`)
    console.error(error)
  }
}

test('4 and 5 in sum equals 7', () => {
  expect(sum(4, 5)).toBe(7)
})

// Logs
// FAIL: 4 and 5 in sum equal 7
// ERROR INFO
```

## Supporting Async Tests

Suppose we're testing a `sumAsync` function that rejects.

```js
test('sumAsync adds 1 and 2 to make 3', async () => {
  const result = await sumAsync(1, 2) // promise rejects
  expect(result).toBe(3)
})
```

This is a problem for our current code because the rejection never gets caught. Instead, we receive a **false positive** saying `SUCCESS: sumAsync adds 1 and 2 to make 3` followed by an unhandled promise rejection error.

Think about what happens inside `test` to cause this:

1. `callback` gets called.
2. Inside `callback`, `sumAsync` rejects.
3. This exits `callback`, which returns a rejected promise itself (because `async` functions return promises, and the rejection travels up the call stack).
4. However, JavaScript doesn't do anything with the rejected promise. It's unhandled. This leads to the rest of the `try` block running, leading to a false positive.

The solution to this problem is to convert `test` itself into a function that uses `async/await`. This solution works because `await` will throw the rejected value of the promise to the `catch` block.

```js
const test = async (description, callback) => {
  try {
    await callback()
    console.log(`SUCCESS: ${description}`)
  } catch (error) {
    console.error(`FAIL: ${description}`)
    console.error(error)
  }
}
```

**Note**: This solution works for both synchronous and asynchronous operations. That's because `await` returns the value of `callback` itself if it's not a promise ([source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)).

## Making Testing Global

Many testing frameworks and assertion libraries automatically make their helper functions globally available. To do this yourself, simply create a `setup-globals.js`:

```js
// Define helper functions here

global.test = test
global.expect = expect
```

All you're doing is attaching your helpers to the `global` object in node. Then you can run the file *prior* to running any tests.

For example: `node --require setup-globals.js test.js`.

## Jest

Everything we've done so far is basically like jest. What makes jest special, however, is the fact that their error messages are *very* clear.