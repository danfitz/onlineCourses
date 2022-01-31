import React, { useReducer } from 'react';

const createDataContext = (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchableActions = Object.keys(actions).reduce((acc, key) => {
      acc[key] = actions[key](dispatch);
      return acc;
    }, {});
    return (
      <Context.Provider value={{ state, ...dispatchableActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

export default createDataContext;
