// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

const countReducer = (state, action) => {
  // if (typeof action === 'function') {
  //   return {
  //     ...state,
  //     ...action(state),
  //   }
  // } else {
  //   return {...state, ...action}
  // }

  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + action.payload,
      }
    default:
      return state
  }
}

function Counter({initialCount = 0, step = 1}) {
  const [{count}, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })

  const increment = () => dispatch({type: 'INCREMENT', payload: step})
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
