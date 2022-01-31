import React from "react";

const WithClass = props => {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
};

const withClass = (WrappedComponent, className) => {
  return props => (
    <div className={className}>
      <WrappedComponent {...props} />
    </div>
  );
};

export { WithClass, withClass };