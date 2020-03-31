import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
// Components
import Congrats from './Congrats'
// Utils
import { findByTestAttr } from '../test/testUtils'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const setup = (props={}) => {
  return shallow(<Congrats {...props} />)
}

test('renders without error', () => {
  const wrapper = setup()
})

test('renders no text when success prop is false', () => {

})

test('renders non-empty congrats message when success prop is true', () => {

})