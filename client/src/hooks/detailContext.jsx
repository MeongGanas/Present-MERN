import { createContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getDetailAbsentee } from "../lib/wrapperPromise";

export const DetailContext = createContext();

export const DetailProvider = ({ children }) => {
  const { absentId } = useParams();
  const resource = useMemo(() => getDetailAbsentee(absentId), [absentId]);

  return (
    <DetailContext.Provider
      value={{
        resource,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
};
