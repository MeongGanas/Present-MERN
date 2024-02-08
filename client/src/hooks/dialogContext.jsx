import { createContext, useState } from "react";

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [joinActive, setJoinActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);

  return (
    <LayoutContext.Provider
      value={{ joinActive, setJoinActive, createActive, setCreateActive }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
