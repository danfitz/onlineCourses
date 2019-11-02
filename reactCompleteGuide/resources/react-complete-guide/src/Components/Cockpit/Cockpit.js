import React, { useEffect } from "react";
import classes from "./Cockpit.css";

const cockpit = props => {
  useEffect(() => {
    console.log("Cockpit.js useEffect");

    const timeoutId = setTimeout(() => {
      // alert("AHHH");
    }, 1000);

    return () => {
      console.log("Cockpit.js cleanup work in effect...");
      clearTimeout(timeoutId);
    };
  }, []);

  const assignedClasses = [];
  
  if (props.people.length <= 2) {
    assignedClasses.push(classes.red);
  };
  if (props.people.length <= 1) {
    assignedClasses.push(classes.bold);
  };

  let btnClass = classes.button;
  if (!props.showPeople) btnClass += ` ${classes.redButton}`;

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>Status of App</p>
      <button className={btnClass} onClick={props.togglePeopleHandler}>Toggle People</button>
    </div>
  );
};

export default cockpit;