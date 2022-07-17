import { createContext, useState, useContext } from "react";

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  const [points, setPoints] = useState({});

  const values = {
    points,
    setPoints,
  };

  return (
    <CanvasContext.Provider value={values}>{children}</CanvasContext.Provider>
  );
};

export const usePoints = () => useContext(CanvasContext);
