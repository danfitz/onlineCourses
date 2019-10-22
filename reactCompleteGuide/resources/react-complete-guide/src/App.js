import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person.js";

class App extends Component {
  
  render() {
    let people = [];
    for (let i = 0; i < 10; i++) {
      people.push(<Person name="Dan" age="27" key={i} />);
    };

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        {people}
      </div>
    );
  }
}

export default App;