import { createContext, useState } from "react";
import { AuthData } from "../types/auth";



export const AuthContext = createContext({} as AuthData);

export const AuthProvider = ({ children }: any) => {

  const [username, setUsername] = useState<string>();
  const [signed, setSigned] = useState<boolean>(false);
  const [token, setToken] = useState<string>();

  const handleLogin = ({ token, username }) => {
    setToken(token);
    setUsername(username);
    setSigned(true);
  }

  const handleLogout = () => {
    setToken(null);
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

