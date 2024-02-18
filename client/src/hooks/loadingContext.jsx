import { createContext, useState } from "react";
import Skeleton from "../components/skeletons/skeletons";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <div className="cursor-wait">
          <Skeleton />
        </div>
      )}
      {!loading && <div>{children}</div>}
    </LoadingContext.Provider>
  );
};
