import { createContext, useEffect, useState } from "react";

export const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log(activeIndex);
  }, [activeIndex]);

  return (
    <TabContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabContext.Provider>
  );
};
