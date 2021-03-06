---
title: 'Mocking Fundamentals'
part: 3
date: '2020-04-28'
categories: [tools]
tags: [js, testing]
source: [egghead]
---

# Mocking Fundamentals

This section implements mocking in vanilla JS without help from testing frameworks and helper functions like Jest. The goal is to better understand how mocking works behind the scenes.

## What is Mocking?

The idea behind mocking comes when you have some module that is too expensive to use directly. For example, there could be asynchronous functions involved, or it could be processing a credit card payment, which is too expensive to actually test.

So, you create a **fake** or **mock** version of the module, so you can test the module without incurring the costs.

## Monkey-patching: Overriding Object Properties

The process of **monkey-patching** is to

1. **Override** the object method with your own mock method.
2. **Cleanup** that mock method by reassigning the key to the original method _after_ you're done your test. (This is so other tests aren't affected by what happens in the target test.)

In the example below, we have a `utils` object with helper functions that we need to monkey-patch:

```js
const assert = require('assert');
const thumbWar = require('../thumb-war');
const utils = require('../utils');

// Override/monkey patch
const originalGetWinner = utils.getWinner; // store original
utils.getWinner = (p1, p2) => p1; // this method is now deterministic for easier testing

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');
assert.strictEqual(winner, 'Kent C. Dodds');

// Cleanup
utils.getWinner = originalGetWinner;
```

## Creating a Mock Factory Function

### Jest version

A **mock function** is a special function that stores properties as it's called, making the function easier to test. We will be recreating some of the functionality of `jest.fn`.

In Jest, here's some cool things you can do:

```js
utils.getWinner = jest.fn((p1, p2) => p1); // custom implementation

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');

// You can test number of times called
expect(utils.getWinner).toHaveBeenCalledTimes(2);
// You can test arguments passed in calls
expect(utils.getWinner.mock.calls).toEqual([
  ['Dan', 'John'],
  ['Dan', 'John'],
]);
```

### Our version

Here's a bare-bones **mock factory function**. It creates a mock function that utilizes a user-provided **implementation** of that function. That implementation replaces the original implementation:

```js
const fn = implementation => {
  const mockFn = (...args) => {
    return implementation(...args);
  };
  return mockFn;
};
```

We want to add the following features to our mock function:

- Stores number of times it's been called.
- Stores the arguments passed into each call.

```js
const fn = implementation => {
  const mockFn = (...args) => {
    mockFn.numCalls++;
    mockFn.mockFn.mock.calls.push(args);
    return implementation(...args);
  };

  // Initialize starting values
  mockFn.numCalls = 0;
  mockFn.mock = { calls: [] };

  return mockFn;
};
```

Now we can perform tests to make sure our mock function ran as many times as we expected _and_ with the arguments we expected.

```js
const originalWinner = utils.getWinner;
utils.getWinner = fn((p1, p2) => p1); // deterministic

utils.getWinner('Dan', 'John');
utils.getWinner('Dan', 'John');

expect(utils.getWinner.numCalls).toBe(2);
expect(utils.getWinner.mocks.calls).toEqual([
  ['Dan', 'John'],
  ['Dan', 'John'],
]);

// Cleanup
utils.getWinner = originalWinner;
```

## Upgrading Our Monkey-patch with spyOn

Our monkey-patch solution of storing `originalWinner` and restoring it during cleanup is a bit messy. We can instead use `spyOn` and `mockRestore` to do that for us.

### Jest version

In Jest, here's the code:

```js
// Overrides original function with mock function at 'getWinner' key
jest.spyOn(utils, 'getWinner');
// Adds custom implementation to pre-existing mock function (instead of during initialization)
utils.getWinner.mockImplementation((p1, p2) => p1);

// Run tests...

// Cleanup
utils.getWinner.mockRestore();
```

### Our version

To recreate the above functionality, here are the requirements:

1. `spyOn` needs to override the original function with a mock function generated by `fn`.
   - **Note**: `fn` needs to accept zero arguments here because the custom implementation comes _after_.
2. We need a `mockRestore` method that resets the function back to its original state.
3. We need a `mockImplementation` method that updates and/or sets the custom implementation.

**Note**: Our solution below uses **closures** to solve 2 and 3.

```js
// Default empty function is what allow fn() call with no arguments
function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    return impl(...args);
  };
  mockFn.mock = { calls: [] };
  // Using closure, we can update our implementation to solve 3
  mockFn.mockImplementation = newImpl => (impl = newImpl);
  return mockFn;
}

function spyOn(object, property) {
  // By storing original implementation, we can override with a mock function, solving 1
  const originalImpl = object[property];
  object[property] = fn();

  // Then using closure, we can restore to the original implementation to solve 2
  object[property].mockRestore = () => {
    object[property] = originalImpl;
  };
}
```

## Mocking a Module

As it turns out, monkey-patching only works with CommonJS. It doesn't work for ES6 modules.

```js
// CommonJS import
const utils = require('../utils');

// ES6 module import
import utils from '../utils';
```

### Jest version

To solve this, Jest introduces the `mock` method. It has 2 parameters:

1. Relative path to module, and
2. Module factory function that returns a mocked version of the module.

```js
import utils from '../utils';

// Overrides module
jest.mock('../utils', () => {
  return {
    getWinner: jest.fn((p1, p2) => p1),
  };
});

// Run tests...

// Cleans up metadata in mock function
utils.getWinner.mockReset();
```

### Our version

The way that Jest kind of implements `mock` behind the scenes is to utilize `require.cache`, an object that stores information about modules in node. Then when you import that module into your file, it will import the mock version instead.

The goal in our vanilla version is to basically

1. Manually inject our mock module into `require.cache`, making sure to include our mock functions as well.
2. Delete the mock module from `require.cache` after we're done testing.

```js
const mock = (relativePath, factory) => {
  const resolvedPath = require.resolve(relativePath);
  require.cache[resolvedPath] = {
    id: resolvedPath,
    filename: resolvedPath,
    loaded: true,
    exports: factory(),
  };

  return () => {
    delete require.cache[resolvedPath];
  };
};

const cleanup = mock('../utils', () => {
  return {
    getWinner: fn((p1, p2) => p1),
  };
});

const utils = require('../utils');

// Run tests...

cleanup();
```

**Things to note**:

- `require.resolve` gets the path for the file.
- We return a `cleanup` function to remove the mocked module.
- The mocked module needs to be created _before_ importing it into the file.

**Pro tip**: Jest actually will run `mock` _before_ any other line of code when running your tests for you. This is a convenience it provides, which is especially useful given that ES modules are always hoisted to the top of the file.

## Sharing Mocked Modules

Very often, you use a module in multiple test files. In this case, you want to externalize your mocked module and re-use it across tests.

### Jest version

Jest allows you to share your mocked module by accessing a `__mocks__` directory at the same directory level as your module file.

```
.
+-- utils.js
+-- __mocks__
| +--utils.js
```

When you call `jest.mock`, it will pull your module from the `__mocks__` directory instead of the original file.

```js
// In test file
// Notice that we don't need to pass a mock module factory function
jest.mock('../utils');

// In __mocks__/utils.js
module.exports = {
  getWinner: jest.fn((p1, p2) => p1),
};
```

### Our version

To implement this ourselves, we need to do the following in our test:

1. Cache the mocked module by running `require`. This will make it show up in `require.cache`.
2. Add the mocked module to `require.cache` _at_ the real module's path.
3. Finally, when we `require` our module, it will import the mocked module instead.

```js
// 1. Cache
require('../__mock__/utils');
// 2. Replace
const mockPath = require.resolve('../__mock__/utils');
const utilsPath = require.resolve('../utils');
require.cache[utilsPath] = require.cache[mockPath];

// 3. Import
const utils = require('../utils');
```

And that's it! (Of course, this is a huge simplification of what Jest is actually doing. Jest takes full control of the module system.)
