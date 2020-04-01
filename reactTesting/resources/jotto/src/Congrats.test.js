// Modules
import React from 'react'
import { shallow } from 'enzyme'
// Components
import Congrats from './Congrats'
// Utils
import { findByTestAttr, checkProps } from '../test/testUtils'

const defaultProps = { success: false }

const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props }
  return shallow(<Congrats {...setupProps} />)
}

test('renders without error', () => {
  const wrapper = setup({ success: false })
  const component = findByTestAttr(wrapper, 'congratsComponent')
  expect(component.length).toBe(1)
})

test('renders no text when success prop is false', () => {
  const wrapper = setup({ success: false })
  const component = findByTestAttr(wrapper, 'congratsComponent')
  expect(component.text()).toBe('')
})

test('renders non-empty congrats message when success prop is true', () => {
  const wrapper = setup({ success: true })
  const message = findByTestAttr(wrapper, 'congratsMessage')
  expect(message.text().length).not.toBe(0)
})

test('does not throw warning with expected props', () => {
  const expectedProps = { success: false }
  checkProps(Congrats, expectedProps)
})