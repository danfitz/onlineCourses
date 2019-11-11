import React from "react";
import classes from "./Modal.css";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => {
  return (
    <Auxiliary>
      <div
        className={classes.Modal}
        aria-hidden={!props.show}
        style={{
          opacity: props.show ? 1 : 0,
          zIndex: props.show ? 500 : -1
        }}
      >
        {props.children}
      </div>
  
      <Backdrop
        show={props.show}
        clicked={props.exit}
      />
    </Auxiliary>
  );
};

export default React.memo(modal, (prevProps, nextProps) => {
  return prevProps.show === nextProps.show;
});