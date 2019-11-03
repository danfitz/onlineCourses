import React from "react";

const withClass = props => {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
};

export default withClass;