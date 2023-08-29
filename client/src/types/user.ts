

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


