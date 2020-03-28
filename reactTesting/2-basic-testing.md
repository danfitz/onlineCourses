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

## Writing Critical Tests (that Fail by Default)

Start by writing out **empty** tests for all the **critical** parts of your app: features that, if they were changed, you'd want to be warned.

```js
// This app shows a counter and a button that, when clicked, increments the counter
test('renders without error', () => {}) // <= PRO TIP: this is an excellent basic first test
test('renders increment button', () => {})
test('renders counter display', () => {})
test('counter starts at 0', () => {})
test('pressing button increments counter display', () => {})
// ^ This last test focuses on *BEHAVIOUR* by looking at output on page, not state
```

**Pro tip**:  One effective method to test whether a component renders is to (1) add a `data-test` attribute to the component, (2) `find` the component using that attribute, and then (3) check that only 1 component is found.

```js
test('renders increment button', () => {
  const wrapper = shallow(<App />)
  const appComponent = wrapper.find('[data-test="appComponent]')
  expect(appComponent.length).toBe(1)
})
```

