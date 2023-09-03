import { useMutation } from "@tanstack/react-query"
import * as service from "../services"
import { UserBase, UserCreate } from "../../../types/user"



export const useAuth = () => {

  const register = useMutation(
    (user: UserCreate) => service.register(user)
  )

  const login = useMutation(
    (user: UserBase) => service.login(user)
  )

  return {
    register,
    login
  }
}
