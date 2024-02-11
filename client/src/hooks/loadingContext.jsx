import { createContext, useState } from "react";
import Loading from "../components/Loading";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && <Loading />}
      {!loading && <div>{children}</div>}
    </LoadingContext.Provider>
  );
};
