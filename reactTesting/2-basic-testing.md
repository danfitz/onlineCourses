---
title: 'Basic Testing'
part: 2
date: '2020-03-27'
categories: [tools]
tags: [js, testing]
source: [udemy]
---

# Basic Testing

## Configure Libraries

Let's start by configuring enzyme (because jest is built into create-react-app):

```js
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new EnzymeAdapter() })
```

**Pro tip**: To save time, you can move this configuration into its own file and tell jest to run it *before* every jest test. In create-react-app, a designated `src/setupTests.js` is already set up for this.

## Writing Tests

### Empty Critical Tests

Start by writing out **empty** tests for all the **critical** parts of your app: features that, if they were changed, you'd want to be **warned**.

```js
// This app shows a counter and a button that, when clicked, increments the counter
test('renders without error', () => {}) // <= PRO TIP: this is an excellent basic first test
test('renders increment button', () => {})
test('renders counter display', () => {})
test('counter starts at 0', () => {})
test('pressing button increments counter display', () => {})
// ^ This last test focuses on *BEHAVIOUR* by looking at output on page, not state
```

### data-test attribute

**Pro tip**:  One effective method to test whether a component renders is to (1) add a `data-test` attribute to the component, (2) `find` the component using that attribute, and then (3) check that only 1 component is found.

```js
test('renders increment button', () => {
  const wrapper = shallow(<App />)
  const button = wrapper.find('[data-test="incrementButton]')
  expect(button.length).toBe(1)
})
```

### Useful helper functions

This function finds nodes in a wrapper with a given `data-test` attribute:

```js
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`)
}
```

This function sets up and returns a `ShallowWrapper` component by encapsulating all configuration in a function:

```js
// Use this to easily instantiate your component in order to test it!
// NOTE 1: The component is passed defaultProps that you can override
// (especially useful when component has required propTypes)
// NOTE 2: If state is provided, state is also set
const defaultProps = { myProp: undefined }

const setup = (props={}, state=null) => {
  const setupProps = { ...defaultProps, ...props }

  const wrapper = shallow(<MyComponent {...setupProps} />)
  if (state) wrapper.setState(state)

  return wrapper
}
```

### Finding child nodes, managing state, and simulating events

Let's test that a button click increments a counter display. This will use:

* `state` and `setState` for state management
* `find` for finding child nodes
* `simulate` for simulating events
* `text` to get inner text of node

```js
test('pressing button increments counter display', () => {
  const wrapper = shallow(<App />)
  wrapper.setState({ counter: 7 }) // <= don't have to do this if component has initial state

  const button = wrapper.find('[data-set="incrementButton"]')
  button.simulate('click')

  const counterDisplay = wrapper.find('[data-set="counterDisplay"]')
  expect(counterDisplay.text()).toContain(8)
})
```

**Note**: We use `toContain` because that allows you to change the text content inside `counterDisplay` without causing test failure.

### propTypes testing

If your component has `propTypes` set up, you can run tests using `check-prop-types` to check that your `propTypes` are doing their job by only accepting the correct props.

```js
import checkPropTypes from 'check-prop-types'

// Helper function
const checkProps = (component, props) => {
  const propsError = checkPropTypes(
    component.propTypes,
    props,
    'prop',
    component.name
  )

  expect(propsError).toBeUndefined()
}

test('expected props don\'t throw error message', () => {
  const expectedProps = { myProp: 'hello' }
  checkProps(MyComponent, expectedProps)
})
```

Using `checkPropTypes` inside `checkProps`, a `propsError` message is returned *if* the provided props don't adhere to `propTypes`. We then check to see if there is in fact an error message using `expect`.

### Contexts, describe, and forEach

We can wrap a set of `test` functions inside a `describe` function, creating a **context** in which all those tests fall under.

For example, a counter may have a set of tests for testing the increment portion of the counter:

```js
describe('if increment button clicked', () => {
  test('does not increment if counter is at 10', () => {
    const wrapper = setup()
    // Expects here
  })
  test('does increment if counter is below 10', () => {
    const wrapper = setup()
    // Expects here
  })
})
```

Notice how we write `const wrapper = setup()` before each test? For code that you're repeating, you can move this to a `beforeEach`. `beforeEach` will run the code *before* each test.

```js
// Refactor
describe('if increment button clicked', () => {
  let wrapper // <= accessible scope
  beforeEach(() => {
    wrapper = setup()
  })

  test('does not increment if counter is at 10', () => {
    // Expects here
  })
  test('does increment if counter is below 10', () => {
    // Expects here
  })
})
```