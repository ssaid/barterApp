import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/auth"
import { useContext, useEffect } from "react"


export const Logout = () => {

  const { handleLogout } = useContext(AuthContext)

  useEffect(() => {
    handleLogout()
  }, [])
  
  return <Navigate to='/' />
}
