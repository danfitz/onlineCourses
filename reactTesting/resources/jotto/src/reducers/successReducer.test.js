import { actionTypes } from '../actions'
import successReducer from './successReducer'

test('When no action is passed, returns default initial state of `false`', () => {
  const newState = successReducer(undefined, {})
  expect(newState).toBe(false)
})

test('Upon receiving `CORRECT_GUESS` action type, returns state of `true`', () => {
  const newState = successReducer(false, { type: actionTypes.CORRECT_GUESS })
  expect(newState).toBe(true)
})