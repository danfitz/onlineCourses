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