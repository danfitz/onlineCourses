import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    isSideDrawerOpen: false
  };

  sideDrawerHandler = () => {
    this.setState(prevState => {
      return {
        isSideDrawerOpen: !prevState.isSideDrawerOpen
      };
    });
  };
  
  render() {
    return (
      <Auxiliary>
        <Toolbar toggleDrawer={this.sideDrawerHandler} />

        <SideDrawer
          isOpen={this.state.isSideDrawerOpen}
          exit={this.sideDrawerHandler}
        />

        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Auxiliary>
    );
  };
};

export default Layout;