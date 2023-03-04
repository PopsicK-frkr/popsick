import React, { useState } from "react";
import { createContext } from "react";

export interface contextType {
  state: boolean;
  toggle: () => void;
}

export const Context = createContext<contextType>({
  state: true,
  toggle: () => {},
});

interface childrenProps {
  children: React.ReactNode;
}

const ContextProvider: React.FC<childrenProps> = ({ children }) => {
  const [state, setState] = useState(true);
  const toggle = () => setState(!state);

  return (
    <Context.Provider value={{ state, toggle }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
