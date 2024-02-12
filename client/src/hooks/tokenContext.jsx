import { createContext, useState } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );

  return (
    <TokenContext.Provider value={{ token, setToken, userData, setUserData }}>
      {children}
    </TokenContext.Provider>
  );
};
