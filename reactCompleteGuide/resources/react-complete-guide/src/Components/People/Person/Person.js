import React, { Component } from "react";

class Person extends Component {
  render() {
    console.log("Person.js rendering...");

    return (
      <div className="person">
        <h2>{this.props.name}</h2>
        <p>Age: {this.props.age}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name} />
        <button onClick={this.props.clicked}>Delete Me</button>
      </div>
    );
  };
};

export default Person;