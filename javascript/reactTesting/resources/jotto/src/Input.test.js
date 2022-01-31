import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr, storeFactory } from '../test/testUtils'
import Input from './Input'

const setup = (initialState={}) => {
  const store = storeFactory(initialState)
  const wrapper = shallow(<Input store={store} />).dive().dive()
  return wrapper
}

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper
    beforeEach(() => wrapper = setup({ success: false }))

    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'inputComponent')
      expect(component.length).toBe(1)
    })

    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'inputBox')
      expect(inputBox.length).toBe(1)
    })

    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submitButton')
      expect(submitButton.length).toBe(1)
    })
  })

  describe('word has been guessed', () => {
    let wrapper
    beforeEach(() => wrapper = setup({ success: true }))

    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'inputComponent')
      expect(component.length).toBe(1)
    })

    test('does not render input box', () => {
      const inputBox = findByTestAttr(wrapper, 'inputBox')
      expect(inputBox.length).toBe(0)
    })

    test('does not render submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submitButton')
      expect(submitButton.length).toBe(0)
    })
  })
})

describe('update state', () => {})