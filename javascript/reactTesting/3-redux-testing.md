---
title: 'Redux Testing'
part: 3
date: '2020-04-21'
categories: [tools]
tags: [js, testing]
source: [udemy]
---

# Redux Testing

In this section, we'll learn how to test

* Action creators
* Reducers
* Thunks
* Asynchronous action creators
* State and action creators in connected component props

## Testing Action Creators

Action creators are really easy to test because they're just vanilla JS. You basically just use `toEqual` to check for deep equality of the action object returned:

```js
// actions.js
const setUsername = username => ({
  type: 'SET_USERNAME',
  username
})

// actions.test.js
test('setUsername returns action object with username as property', () => {
  const username = 'danfitz'
  const action = setUsername(username)

  expect(action).toEqual({
    type: 'SET_USERNAME',
    username
  })
})
```

## Testing Reducers

Reducers are vanilla JS just like action creators, so the process is the same:

```js
// reducer.js
const initialState = false
const reducer = (state=initialState, action) => {
  switch (action.type) {
    case "SET_TRUE":
      return true
    default:
      return state
  }
}

// reducer.test.js
test('returns default state of `false` when no action passed', () => {
  const newState = reducer(initialState, {})
  expect(newState).toBe(false)
})

test('returns state of `false` when SET_TRUE action passed', () => {
  const newState = reducer(initialState, { type: 'MAKE_TRUE' })
  expect(newState).toBe(true)
})
```

## When to Unit Test Action Creators and Reducers

Some developers think that unit testing action creators and reducers is unnecessary. Instead, you only need to perform integration tests on the API, i.e., simulating user interaction and seeing how it affects the redux store. In this case, action creators and reducers are treated as **implementation details**, and all that matters is the end result for the user.

The *benefit* of this approach is fewer tests to maintain and refactor when code is refactored. The *disadvantage* is that sometimes it will be harder to pinpoint what exactly went wrong if you don't have fine-grained unit tests.

**Rule of thumb**: At the very least, it's a good idea to unit test your action creators and reducers when they become *sufficiently complicated*. Dead simple ones may not be worth your time.

## Testing Redux Connected Components

When testing components that access redux store via the `connect` higher-order wrapper, you don't automatically have access to store. That's because there's no parent `Provider` to provide the context.

The solution to this is to

1. Create a `storeFactory` helper function that mirrors your configuration of `store` in your `store.js` file, and then
2. Pass `store` as a prop to the component you're testing.

**Note**: Passing `store` as a prop works because of jest (?).

```js
import { createStore } from 'redux'
import rootReducer from './reducers'

const storeFactory = initialState => {
  return createStore(rootReducer, initialState)
}

// In test file, you can now include `store` in your `setup` helper
const setup = (initialState={}) => {
  const store = storeFactory(initialState)
  const wrapper = shallow(<Component store={store} />)
  return wrapper
}
```

Now when you test your component, you should be able to test redux state.

### Enzyme `dive` method

When you provide a redux store in your tests, your component gets passed through a higher-order component, getting wrapped around a `Provider`.

Since `shallow` only renders the outermost component and none of its children, you need to `dive` in order to reach the DOM nodes you care about.

```js
// What you get from shallow()
<ContextProvider>
  <Component />
</ContextProvider>

// What you want: contents of component
<h1>Hello!</h1>

// How to reach it: dive twice
// Once to get to child component and a second time for contents of child component
const wrapper = shallow(<Component store={store} />).dive().dive()
```

**Pro tip**: An alternative to the `dive` approach is to just export the unconnected component and test *that*.

### Tradeoffs when testing redux

**Do you want to test the actual store or a mock store?** You can use a library called `redux-mock-store`, which allows you to test *intermediate* actions that lead up to your final state. Whereas using the actual store only allows you to test the final state. On the other hand, the actual store is closer to the live app. This is tradeoff you want to think about.

**Do you want to test connected or unconnected components?** Connected components are closer to the live app,and they allow you to test the store state. On the other hand, unconnected components allow you to pass action creators as props. (Why does that matter?) Again, this is a tradeoff decision.