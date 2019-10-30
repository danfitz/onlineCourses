import React from "react";

const person = (props) => {
  return (
    <div className="person">
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <input type="text" onChange={props.handleNameChange} value={props.name} />
      <button onClick={props.deletePerson}>Delete Me</button>
    </div>
  );
};

export default person;