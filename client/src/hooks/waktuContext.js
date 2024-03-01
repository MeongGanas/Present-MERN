import { createContext, useEffect, useState } from "react";

export const WaktuContext = createContext();

export const WaktuProvider = ({ children }) => {
  const [waktu, setWaktu] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setWaktu(new Date());
    }, 1000);
  });

  return (
    <WaktuContext.Provider
      value={{
        waktu,
      }}
    >
      {children}
    </WaktuContext.Provider>
  );
};
