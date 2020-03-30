import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import App from './App';

const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />)
  if (state) {
    wrapper.setState(state)
  }
  return wrapper
}

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`)
}

// Configure enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() })

test('renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'appComponent')
  expect(appComponent.length).toBe(1)
})

test('renders increment button', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'incrementButton')
  expect(button.length).toBe(1)
})

test('renders decrement button with text "Decrement"', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'decrementButton')
  expect(button.length).toBe(1)
  expect(button.text()).toBe('Decrement')
})

test('renders counter display', () => {
  const wrapper = setup()
  const counterDisplay = findByTestAttr(wrapper, 'counterDisplay')
  expect(counterDisplay.length).toBe(1)
})

test('counter starts at 0', () => {
  const wrapper = setup()
  const initialCounterState = wrapper.state('counter')
  expect(initialCounterState).toBe(0)
})

test('clicking increment button increments counter DISPLAY by 1', () => {
  const counter = 7
  const wrapper = setup({}, { counter })
  
  let counterDisplay = findByTestAttr(wrapper, 'counterDisplay')
  expect(counterDisplay.text()).toContain(counter)
  
  const button = findByTestAttr(wrapper, 'incrementButton')
  button.simulate('click')

  counterDisplay = findByTestAttr(wrapper, 'counterDisplay')
  expect(counterDisplay.text()).toContain(counter + 1)
})

test('clicking decrement button decrements counter DISPLAY by 1', () => {
  const counter = 7
  const wrapper = setup({}, { counter })

  const button = findByTestAttr(wrapper, 'decrementButton')
  button.simulate('click')

  const counterDisplay = findByTestAttr(wrapper, 'counterDisplay')
  expect(counterDisplay.text()).toContain(counter - 1)
})

test('decrementing counter does not go below 0 but displays error message', () => {
  const counter = 0
  const wrapper = setup({}, { counter })

  const button = findByTestAttr(wrapper, 'decrementButton')
  button.simulate('click')

  const counterDisplay = findByTestAttr(wrapper, 'counterDisplay')
  expect(counterDisplay.text()).toContain(counter)

  const errorMessage = findByTestAttr(wrapper, 'errorMessage')
  expect(errorMessage.length).toBe(1)
})

test('clicking increment button clears error message', () => {
  const wrapper = setup({}, { counter: 0, hasError: true })

  let errorMessage = findByTestAttr(wrapper, 'errorMessage')
  expect(errorMessage.length).toBe(1)

  const button = findByTestAttr(wrapper, 'incrementButton')
  button.simulate('click')

  errorMessage = findByTestAttr(wrapper, 'errorMessage')
  expect(wrapper.state().hasError).toBe(false)
  expect(errorMessage.length).toBe(0)
})