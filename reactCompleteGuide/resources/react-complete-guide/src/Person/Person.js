import React from "react";

const person = (props) => {
  return (
    <div className="person">
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
    </div>
  );
};

export default person;