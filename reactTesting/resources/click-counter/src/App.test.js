import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import App from './App';

// Configure enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() })

test('renders without error', () => {
  const wrapper = shallow(<App />)
  const appComponent = wrapper.find('[data-test="appComponent"]')
  expect(appComponent.length).toBe(1)
})

test('renders increment button', () => {
  const wrapper = shallow(<App />)
  const button = wrapper.find('[data-test="incrementButton"]')
  expect(button.length).toBe(1)
})

test('renders counter display', () => {
  const wrapper = shallow(<App />)
  const counterDisplay = wrapper.find('[data-test="counterDisplay"]')
  expect(counterDisplay.length).toBe(1)
})

test('counter starts at 0', () => {

})

test('clicking button increments counter DISPLAY by 1', () => {
  
})