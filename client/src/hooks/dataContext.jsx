import { createContext, useMemo, useState } from "react";
import { getUserAbsentee } from "../lib/wrapperPromise";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  const [absentee, setAbsentee] = useState(null);
  const resource = useMemo(() => getUserAbsentee(userData._id), [userData._id]);

  return (
    <DataContext.Provider
      value={{
        token,
        setToken,
        userData,
        setUserData,
        resource,
        absentee,
        setAbsentee,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
