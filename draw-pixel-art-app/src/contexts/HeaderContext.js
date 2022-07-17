import { createContext, useState, useContext } from "react";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [isShareable, setIsShareable] = useState(false);

  const values = {
    isShareable,
    setIsShareable,
  };

  return (
    <HeaderContext.Provider value={values}>{children}</HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);
