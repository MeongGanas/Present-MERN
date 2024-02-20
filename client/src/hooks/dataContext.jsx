import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  const [absentee, setAbsentee] = useState(null);

  useEffect(() => {
    console.log(absentee);
  }, [absentee]);

  return (
    <DataContext.Provider
      value={{
        token,
        setToken,
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
