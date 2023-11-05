import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const GlobalContext = createContext(null);

const ContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(true);

  const value = {
    user,
    setUser,
    userLoaded
  }
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;

ContextProvider.propTypes = {
  children: PropTypes.node
}