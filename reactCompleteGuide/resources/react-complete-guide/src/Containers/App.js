import React, { Component } from "react";
import classes from "./App.css";
import People from "../Components/People/People";
import Cockpit from "../Components/Cockpit/Cockpit";

class App extends Component {
  constructor(props) {
    super(props);

    console.log("App.js constructor");

    this.state = {
      people: [
        { id: "1adf04k", name: "Dan", age: 27 },
        { id: "132ofojsk", name: "John", age: 28 },
        { id: "3509sdlkj", name: "Bibi", age: 67 }
      ],
      showPeople: false,
      showCockpit: true
    };
  };

  static getDerivedStateFromProps(props, state) {
    console.log("App.js getDerivedStateFromProps");
    return state;
  };

  componentDidMount() {
    console.log("App.js componentDidMount");
  };

  shouldComponentUpdate() {
    console.log("App.js shouldComponentUpdate");
    return true;
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("App.js componentDidUpdate");
  };

  togglePeopleHandler = () => {
    this.setState({
      showPeople: !this.state.showPeople
    });
  };

  handleNameChange = (event, id) => {
    const personIndex = this.state.people.findIndex(person => person.id === id);
    
    const copyPerson = { ...this.state.people[personIndex] };
    copyPerson["name"] = event.target.value;

    const people = [...this.state.people];
    people[personIndex] = copyPerson;

    this.setState({
      people
    });
  };

  deletePerson = (id) => {
    const peopleCopy = [...this.state.people];
    const personIndex = peopleCopy.findIndex(p => p.id === id);
    
    peopleCopy.splice(personIndex, 1);

    this.setState({
      people: peopleCopy
    });

  };

  toggleCockpit = () => {
    this.setState({
      showCockpit: !this.state.showCockpit
    });
  };

  render() {
    console.log("App.js render");

    return (
      <div className={classes.App}>
        <button onClick={this.toggleCockpit}>Toggle Cockpit</button>
        
        { this.state.showCockpit ?
          <Cockpit
            title={this.props.title}
            showPeople={this.state.showPeople}
            numPeople={this.state.people.length}
            togglePeopleHandler={this.togglePeopleHandler} />
        : null }
        
        { this.state.showPeople ?
          <People
            people={this.state.people}
            clicked={this.deletePerson}
            changed={this.handleNameChange} />
        : null }
      </div>
    );
  };
};

export default App;