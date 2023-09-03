import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/auth"
import { useContext } from "react"


export const Logout = () => {

  const { handleLogout } = useContext(AuthContext)

  handleLogout()
  
  return <Navigate to='/' />
}
