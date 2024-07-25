import { useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types"
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  return (
  <GlobalContext.Provider value={{sidebarActive, setSidebarActive}}>
    {children}
  </GlobalContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
    children: PropTypes.element
}