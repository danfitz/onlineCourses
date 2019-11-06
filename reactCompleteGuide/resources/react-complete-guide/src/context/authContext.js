import React from "react";

const authContext = React.createContext({
  isAuthenticated: false,
  toggleLogin: () => {}
});

export default authContext;