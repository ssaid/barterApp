

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
  city_name: string,
  region_id: string,
  country_id: string,
}
