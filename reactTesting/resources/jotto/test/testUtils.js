import checkPropTypes from 'check-prop-types'

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`)
}

export const checkProps = (component, props) => {
  const propsError = checkPropTypes(
    component.propTypes,
    props,
    'prop',
    component.name
  )
  
  expect(propsError).toBeUndefined()
}