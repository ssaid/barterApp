import { useMutation, useQuery } from "@tanstack/react-query"
import * as service from "../services"
import { UserCreate } from "../../../types/user"



export const useRegister = () => {

  const mutation = useMutation(
    (user: UserCreate) => service.register(user)
  )

  return {
    mutation
  }
}
