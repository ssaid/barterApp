

export type UserBase = {
  name: string,
  email: string,
  password: string,
}

export type User = UserBase & {
  'id': number,
}


