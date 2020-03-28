import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div data-test='appComponent'>
        <h1 data-test='counterDisplay'>Counter</h1>
        <button data-test='incrementButton'>Increment</button>
      </div>
    );
  }
}

export default App;
