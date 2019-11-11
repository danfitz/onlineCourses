import React from "react";
import classes from "./MenuButton.css";
import { visuallyHidden } from "../../../index.css";

const menuButton = props => {
  return (
    <button
      className={classes.MenuButton}
      onClick={props.clicked}
    >
      <span className={visuallyHidden}>Menu</span>
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
};

export default menuButton;