import { api } from "../../../api/api";
import { LoginToken } from "../../../types/auth";
import { Country, Location, Point, State } from "../../../types/location";
import { ContactMethod, User, UserBase, UserCreate, UserInformation } from "../../../types/user";


export const register = async (user: UserCreate) => 
  await api.post<User>('/auth/users/', user)

export const login = async (user: UserBase) =>
  await api.post<LoginToken>('/auth/token/', user)

export const getCategories = async () =>
  await api.get<any>('/categories/')

export const getCountries = async () => {
  const { data } = await api.get<Country[]>('/countries/')
  return data
}

export const getUserInfo = async () => {
  const { data } = await api.get<UserInformation>('/users/info/')
  return data
}

export const saveUserInfo = async (user: Partial<UserInformation>) => {
  const { avatar, ...rest } = user
  if (avatar instanceof File)
    await api.put<UserInformation>(`/users/avatar/`, { avatar }, { headers: { "Content-Type": "multipart/form-data", } })

  return await api.patch<UserInformation>('/users/info/', rest)
}

export const getContactMethods = async () => {
  const { data } = await api.get<ContactMethod[]>('/contactmethods/')
  return data
}

export const getStates = async () => {
  const { data } = await api.get<State[]>('/regions/')
  return data
}

export const geoLocalize = async (point: Point) => {
  const { data } = await api.get<Location>('/geo/localize', { params: point })
  return data
}


