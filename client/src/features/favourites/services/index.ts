import { api } from "../../../api/api"
import { Post } from "../../../types/post"



export const getFavourites = async() => {
  const { data } = await api.get<Post[]>("/favourites")
  return data
}
