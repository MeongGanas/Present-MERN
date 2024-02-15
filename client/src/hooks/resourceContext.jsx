import { createContext, useMemo, useState } from "react";
import { getUserAbsentee } from "../lib/wrapperPromise";

export const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  const resource = useMemo(() => getUserAbsentee(userData._id), [userData._id]);

  return (
    <ResourceContext.Provider
      value={{
        resource,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};
