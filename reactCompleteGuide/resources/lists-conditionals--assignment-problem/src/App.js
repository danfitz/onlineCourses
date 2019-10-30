import React, { Component } from 'react';
import './App.css';

function Input(props) {
  return (
    <div className="inputContainer">
      <input type="text" value={props.value} onChange={props.handleInput} />
      <p>{props.value}</p>
    </div>
  );
};

function ValidationComponent(props) {
  const textOutput = props.input.length >= 5 ? "Text too long" : "Text too short";

  return <p>{textOutput}</p>;
};

function CharComponent(props) {
  const style = {
    display: "inline-block",
    padding: "16px",
    textAlign: "center",
    margin: "16px",
    border: "1px solid black"
  };

  return <li style={style} onClick={props.deleteCharacter}>{props.character}</li>
};

String.prototype.splice = function(start, deleteCount) {
  deleteCount = deleteCount || 1; // defaults to 1 if none provided

  // Slices left part of string up to BEFORE start position
  const leftString = this.slice(0, start);
  // Slices right part of string AFTER deleted chunk
  const rightString = this.slice(start + deleteCount, this.length);

  // Returns the spliced/merged together version of both remaining parts
  return leftString + rightString;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ""
    };
  };

  handleInput = (event) => {
    this.setState({
      input: event.target.value
    });
  };

  deleteCharacter = index => {
    const shorterInput = this.state.input.splice(index);

    this.setState({
      input: shorterInput
    });
  };

  render() {
    const characterJSX = this.state.input.split("").map((char, index) => {
      return (
        <CharComponent
          key={index}
          character={char}
          deleteCharacter={this.deleteCharacter.bind(this, index)}
        />
      );
    });

    return (
      <div className="App">
        <Input value={this.state.input} handleInput={this.handleInput} />
        <ValidationComponent input={this.state.input} />

        <ul>
          {characterJSX}
        </ul>

        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
      </div>
    );
  }
}

export default App;
