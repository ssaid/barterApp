import { createContext, useEffect, useState } from "react";
import { AuthData } from "../types/auth";



export const AuthContext = createContext({} as AuthData);

export const AuthProvider = ({ children }: any) => {

  const [username, setUsername] = useState<string>();
  const [signed, setSigned] = useState<boolean>(false);
  const [token, setToken] = useState<string>();

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

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token)
      setSigned(true)
    }

  }, [])

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

