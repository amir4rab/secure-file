import { createContext, useState } from "react";

export const LayoutContext = createContext({
  isOpen: false,
  setIsOpen: ( input: boolean ) => {}  
});

export const LayoutProvider = ({ children }:{ children: JSX.Element }) => {
  const [ isOpen, setIsOpen ] = useState(false);

  const value = {
    isOpen,
    setIsOpen
  };

  return (
    <LayoutContext.Provider value={ value }>
      { children }  
    </LayoutContext.Provider>
  )
}