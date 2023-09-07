import { createContext, useState } from "react";
import { AuthData } from "../types/auth";



export const AuthContext = createContext({} as AuthData);

export const AuthProvider = ({ children }: any) => {

  const localToken = localStorage.getItem('token');

  const [username, setUsername] = useState<string>();
  const [signed, setSigned] = useState<boolean>( !!localToken );
  const [token, setToken] = useState<string | undefined>(localToken);

  const handleLogin = ({ token }) => {
    setToken(token);
    setSigned(true);
  }

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUsername(null);
    setSigned(false);
  }


  return (
    <AuthContext.Provider
      value={{ 
        signed,
        username,
        token,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

