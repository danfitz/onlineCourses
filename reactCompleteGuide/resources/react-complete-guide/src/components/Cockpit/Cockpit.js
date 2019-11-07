import React, { useEffect, useRef, useContext } from "react";
import classes from "./Cockpit.css";
import Auxiliary from "../../hoc/Auxiliary";
import AuthContext from "../../context/authContext";

const cockpit = props => {
  const btnRef = useRef(null);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log("Cockpit.js useEffect");
    btnRef.current.click();

    return () => {
      console.log("Cockpit.js cleanup work in effect...");
    };
  }, []);

  const assignedClasses = [];
  
  if (props.numPeople <= 2) {
    assignedClasses.push(classes.red);
  };
  if (props.numPeople <= 1) {
    assignedClasses.push(classes.bold);
  };

  let btnClass = classes.button;
  if (!props.showPeople) btnClass += ` ${classes.redButton}`;

  return (
    <Auxiliary>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>Status of App</p>
      
      <button
        ref={btnRef}
        className={btnClass}
        onClick={props.togglePeopleHandler}
        >
        Toggle People
      </button>

      <button onClick={authContext.toggleLogin}>
        { authContext.isAuthenticated ? "Log Out" : "Log In" }
      </button>
    </Auxiliary>
  );
};

export default React.memo(cockpit);