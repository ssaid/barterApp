

export type Country = {
  id: string,
  name: string,
  code: string,
}

export type State = {
  id: string,
  name: string,
}

export type Point = {
  latitude: number,
  longitude: number
}

export type Location = {
  city: string,
  region: string,
  country: string,
}
