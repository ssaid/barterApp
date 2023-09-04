import { FC, PropsWithChildren, useContext } from "react";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";



export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {

  const {signed} = useContext(AuthContext)

  return signed ? children : <Navigate to="/login" />

}
