import React from 'react'
import PropTypes from 'prop-types'

const Congrats = ({ success }) => (
  <div data-test='congratsComponent'>
    { success ? (
      <span data-test='congratsMessage'>
        Congratulations! You guessed the word!
      </span>
    ) : null }
  </div>
)

Congrats.propTypes = {
  success: PropTypes.bool.isRequired
}

export default Congrats