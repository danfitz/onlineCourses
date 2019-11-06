import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./Person.css";
import Auxiliary from "../../../hoc/Auxiliary";
import AuthContext from "../../../context/authContext";
import { withClass } from "../../../hoc/WithClass";

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  };

  componentDidMount() {
    this.inputRef.current.focus();
  };

  render() {
    console.log("Person.js rendering...");

    return (
      <Auxiliary>
        <AuthContext.Consumer>
          {context => (
            context.isAuthenticated ? <p>Authenticated!</p> : <p>Please Log In</p>
          )}
        </AuthContext.Consumer>
        <h2>{this.props.name}</h2>
        <p>Age: {this.props.age}</p>
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
          ref={this.inputRef}
        />
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