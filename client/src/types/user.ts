

export type UserBase = {
  email: string,
  password: string,
}

export type UserCreate = UserBase & {
  name: string,
}

export type User = UserBase & {
  'id': number,
}

export type UserInformation = {
  country: string,
  state: string,
  city: string,
  contact_methods: ContactMethod[],
}



export type ContactMethod = {
  method: string,
  value: string,
}
