import React, { Component } from 'react'
import { connect } from 'react-redux'

class Input extends Component {
  render() {
    return (
      <div data-test='inputComponent'>
        {!this.props.success ? (
          <form className='form-inline'>
            <input
              data-test='inputBox'
              className='mb-2 mx-sm-3'
              placeholder='Enter guess'
              type='text' />
            
            <button
              data-test='submitButton'
              className='btn btn-primary mb-2'
              type='submit'
            >
              Submit
            </button>
          </form>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = ({ success }) => ({ success })

export default connect(mapStateToProps)(Input)