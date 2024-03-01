import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    const checkValidToken = async () => {
      await axios
        .get("https://present-client-green.vercel.app/middleware/secure-data", {
          headers: { token },
        })
        .then(() => setIsAuthenticated(true))
        .catch((err) => console.log(err));
    };

    if (token && userData) {
      checkValidToken();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
