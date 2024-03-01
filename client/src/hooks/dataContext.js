import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  const [absentee, setAbsentee] = useState(null);

  return (
    <DataContext.Provider
      value={{
        userData,
        setUserData,
        absentee,
        setAbsentee,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
