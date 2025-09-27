'use client';
import { createContext, useContext, useState, useMemo } from "react";

const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const value = useMemo(
    () => ({ isOpen, openPopup, closePopup }),
    [isOpen]
  );

  return (
    <PopupContext.Provider value={value}>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  return useContext(PopupContext);
}
