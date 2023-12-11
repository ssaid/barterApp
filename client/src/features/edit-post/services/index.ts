import { api } from "../../../api/api"
import { type Post } from "../../../types/post"



export const getPost = async( id: string | number ) => {
  const { data } = await api.get<Post>(`/myposts/${id}`)

  return data
}
