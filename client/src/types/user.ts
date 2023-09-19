import { ImageSizes } from "./category"


export type UserBase = {
  email: string,
  password: string,
}

export type UserCreate = UserBase & {
  username: string,
}

export type User = UserBase & {
  'id': number,
}

export type UserInformation = {
  country: string,
  coords: { latitude: number, longitude: number },
  state: string,
  city: string,
  contacts: ContactMethodCreate[],
  avatar: ImageSizes | File | string,
}

export type ContactMethodCreate = {
  contact_method: number,
  contact: string,
}

export type ContactMethod = {
  id: number,
  type: string
  name: string
  image: string
}
