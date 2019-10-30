import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person.js";


class App extends Component {
  constructor() {
    super();
    this.state = {
      people: [
        { id: "1adf04k", name: "Dan", age: 27 },
        { id: "132ofojsk", name: "John", age: 28 },
        { id: "3509sdlkj", name: "Bibi", age: 67 }
      ],
      showPeople: true
    };
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

  render() {
    const peopleJSX = this.state.people.map(person => {
      return <Person
        key={person.id}
        name={person.name}
        age={person.age}
        handleNameChange={(event) => this.handleNameChange(event, person.id)}
        deletePerson={this.deletePerson.bind(this, person.id)} />;
    });
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <button onClick={this.togglePeopleHandler}>Toggle People</button>
        { this.state.showPeople ? peopleJSX : null }
      </div>
    );
  };
};

export default App;