import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./Person.css";
import Auxiliary from "../../../hoc/Auxiliary";
import { withClass } from "../../../hoc/WithClass";

class Person extends Component {
  render() {
    console.log("Person.js rendering...");

    return (
      <Auxiliary>
        <h2>{this.props.name}</h2>
        <p>Age: {this.props.age}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name} />
        <button onClick={this.props.clicked}>Delete Me</button>
      </Auxiliary>
    );
  };
};

Person.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  change: PropTypes.func,
  clicked: PropTypes.func
};

export default withClass(Person, classes.Person);