import { createContext, useContext, useState } from "react";

const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [apiData, setApiData] = useState(null);

  const toggle = () => setIsToggled((prev) => !prev);

  return (
    <ToggleContext.Provider value={{ isToggled, toggle, apiData, setApiData }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => useContext(ToggleContext);
