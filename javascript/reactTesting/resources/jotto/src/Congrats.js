import React from 'react'
import PropTypes from 'prop-types'

const Congrats = ({ success }) => {
  if (success) {
    return (
      <div
        data-test='congratsComponent'
        className='alert alert-success'
      >
        <span data-test='congratsMessage'>
          Congratulations! You guessed the word!
        </span>
      </div>
    )
  } else {
    return (
      <div data-test='congratsComponent' />
    )
  }
}

Congrats.propTypes = {
  success: PropTypes.bool.isRequired
}

export default Congrats