import { useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect } from "react";
const UserContext = createContext();
import Cookies from "js-cookie"
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signed, setSigned] = useState(null);
  const [loadingData, setLoadingData] = useState(null);
  async function validateToken() {
    const userToken = Cookies.get("authToken");
    if (userToken) {
        setLoadingData(true)
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_DEVELOPMENT}/validar-token`,
          userToken
        );
        setSigned(true);
        setUser(response.data);
      } catch {
        setUser(null);
        setSigned(false);
      }finally{
        setLoadingData(false)
      }
    }
  }

  useEffect(()=>{
    validateToken()
  },[])

  return (
    <UserContext.Provider value={{ user, setUser, signed, setSigned, loadingData }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.element,
};

export { UserContext, UserProvider };
