import checkPropTypes from 'check-prop-types'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../src/reducers'
import { middlewares } from '../src/store'

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

export const storeFactory = initialState => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  )
}