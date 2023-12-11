import { useQuery } from "@tanstack/react-query"
import * as services from "../services"



export const useGetPost = (id: string) => {

  const post = useQuery(
    ['post', id],
    () => services.getPost(id)
  )

  return {
    post
  }
}


