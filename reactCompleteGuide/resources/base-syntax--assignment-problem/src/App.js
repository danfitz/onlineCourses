import React, { useState } from 'react';
import './App.css';
import "./UserOutput.css";

const UserInput = (props) => {
  const style = {
    border: "none",
    background: "black",
    color: "white",
    padding: "1rem",
    display: "block"
  };

  return <input style={style} type="text" onChange={props.handleInput} value={props.value} />;
};

const UserOutput = (props) => {
  return (
    <div className="userOutput">
      <p><strong>{props.username}:</strong> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda veritatis consequatur necessitatibus repellendus ratione inventore.</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
    </div>
  );
};

const app = () => {
  const [userState, setUserState] = useState({
    username: "danfitz"
  });

  const handleInput = (event) => {
    setUserState({
      username: event.target.value
    });
  };

  return (
    <div className="App">
      <UserInput handleInput={handleInput} value={userState.username} />
      <UserOutput username={userState.username} />
      <UserOutput username={userState.username} />
      <ol>
        <li>Create TWO new components: UserInput and UserOutput</li>
        <li>UserInput should hold an input element, UserOutput two paragraphs</li>
        <li>Output multiple UserOutput components in the App component (any paragraph texts of your choice)</li>
        <li>Pass a username (of your choice) to UserOutput via props and display it there</li>
        <li>Add state to the App component (=> the username) and pass the username to the UserOutput component</li>
        <li>Add a method to manipulate the state (=> an event-handler method)</li>
        <li>Pass the event-handler method reference to the UserInput component and bind it to the input-change event</li>
        <li>Ensure that the new input entered by the user overwrites the old username passed to UserOutput</li>
        <li>Add two-way-binding to your input (in UserInput) to also display the starting username</li>
        <li>Add styling of your choice to your components/ elements in the components - both with inline styles and stylesheets</li>
      </ol>
    </div>
  );
}

export default app;