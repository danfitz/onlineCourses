import React, { Component } from "react";
import classes from "./App.css";
import People from "../components/People/People";
import Cockpit from "../components/Cockpit/Cockpit";
import AuthContext from "../context/authContext";
import { WithClass } from "../hoc/WithClass";

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
      showCockpit: true,
      isAuthenticated: false,
      counter: 0
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

    this.setState((prevState) => {
      return {
        people,
        counter: prevState.counter + 1
      };
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

  loginHandler = () => {
    this.setState((prevState) => {
      return { isAuthenticated: !prevState.isAuthenticated };
    });
  };

  render() {
    console.log("App.js render");

    return (
      <WithClass className={classes.App}>
        <button onClick={this.toggleCockpit}>Toggle Cockpit</button>

        <p>Counter: {this.state.counter}</p>
        
        <AuthContext.Provider
          value={{
            isAuthenticated: this.state.isAuthenticated,
            toggleLogin: this.loginHandler
        }}>
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
        </AuthContext.Provider>
      </WithClass>
    );
  };
};

export default App;