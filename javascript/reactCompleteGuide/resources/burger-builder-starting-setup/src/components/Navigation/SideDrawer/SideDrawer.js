import React from "react";
import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

const sideDrawer = props => {
  const openOrClosed = props.isOpen ? classes.Open : classes.Close;

  return (
    <Auxiliary>
      <Backdrop
        show={props.isOpen}
        clicked={props.exit}
      />
      <div className={[classes.SideDrawer, openOrClosed].join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxiliary>
  );
}

export default sideDrawer;