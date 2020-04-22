import React, { Component } from 'react'
import { connect } from 'react-redux'

class Input extends Component {
  render() {
    return (
      <div>{success}</div>
    )
  }
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps)(Input)