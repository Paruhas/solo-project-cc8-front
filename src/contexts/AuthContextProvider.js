import { createContext, useState } from "react";
import { getToken } from "../services/localStorageService";

export const AuthContext = createContext();

export function AuthContextProvider( { children } ) {
  const [isAuthenticated, setIsAuthenticated] = useState(getToken());
  const [user, setUser] = useState({});

  const [cartItem, setCartItem] = useState(0)

  // const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: isAuthenticated,
      setIsAuthenticated: setIsAuthenticated,
      user: user,
      setUser: setUser,
      cartItem: cartItem,
      setCartItem: setCartItem,
      // isAdmin: isAdmin,
      // setIsAdmin: setIsAdmin
      }}>
        { children }
    </AuthContext.Provider>
  );
};
