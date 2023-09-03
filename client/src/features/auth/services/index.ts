import { api } from "../../../api/api";
import { UserCreate } from "../../../types/user";


export const register = async (user: UserCreate) => 
  await api.post('/auth/users', user)

export const login = async (email: string, password: string) => {

  return await api.post('/auth/token', { email, password })
}
