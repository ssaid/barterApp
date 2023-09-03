import { api } from "../../../api/api";
import { LoginToken } from "../../../types/auth";
import { UserBase, UserCreate } from "../../../types/user";


export const register = async (user: UserCreate) => 
  await api.post('/auth/users/', user)

export const login = async (user: UserBase) =>
  await api.post<LoginToken>('/auth/token/', user)
