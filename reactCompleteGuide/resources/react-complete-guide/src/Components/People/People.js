import React, { Component } from "react";
import Person from "./Person/Person.js";

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  static getDerivedStateFromProps(props, state) {
    console.log("People.js getDerivedStateFromProps");
    return state;
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log("People.js shouldComponentUpdate");
    return nextProps.people !== this.props.people;
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("People.js getSnapshotBeforeUpdate");
    return null;
  };

  componentDidUpdate() {
    console.log("People.js componentDidUpdate");
  };

  componentWillUnmount() {
    console.log("People.js componentWillUnmount");
  };

  render() {
    console.log("People.js rendering...");
    
    const peopleJSX = this.props.people.map(person => {
      return <Person
        key={person.id}
        name={person.name}
        age={person.age}
        changed={(event) => this.props.changed(event, person.id)}
        clicked={() => this.props.clicked(person.id)} />;
    });
  
    return peopleJSX;
  };
};

export default People;