import { api } from "../../../api/api"
import { Post } from "../../../types/post"


export const getPost = async( slug: string ) => {
  const { data } = await api.get<Post>(`/posts/${slug}/`)
  return data
}

