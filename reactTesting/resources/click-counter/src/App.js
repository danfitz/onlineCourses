import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      hasError: false
    }
  }

  increment = () => {
    this.setState(state => ({ counter: state.counter + 1, hasError: false }))
  }

  decrement = () => {
    if (this.state.counter > 0) {
      this.setState(state => ({ counter: state.counter - 1, hasError: false }))
    } else {
      this.setState({ hasError: true })
    }
  }
  
  render() {
    return (
      <div data-test='appComponent'>
        <h1 data-test='counterDisplay'>Counter is currently {this.state.counter}</h1>
        <button data-test='incrementButton' onClick={this.increment}>Increment</button>
        <button data-test='decrementButton' onClick={this.decrement}>Decrement</button>

        { this.state.hasError ? (
          <p data-test='errorMessage' style={{ color: 'red', fontWeight: 'bold' }}>Counter can't go below zero</p>
        ) : null }
      </div>
    );
  }
}

export default App;
