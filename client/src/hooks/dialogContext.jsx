import { createContext, useEffect, useState } from "react";
import { MakeAbsenteeDialog } from "../components/Dialog";

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [joinActive, setJoinActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const [absentHour, setAbsentHour] = useState(false);

  useEffect(() => {
    if (joinActive || createActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [joinActive, createActive]);

  return (
    <LayoutContext.Provider
      value={{
        joinActive,
        setJoinActive,
        createActive,
        setCreateActive,
        absentHour,
        setAbsentHour,
      }}
    >
      <MakeAbsenteeDialog />

      {children}
    </LayoutContext.Provider>
  );
};
