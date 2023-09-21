import { useQuery } from "@tanstack/react-query"
import { getPost } from "../service"



export const usePost = ({ slug }: { slug: string }) => {

  return useQuery(
    ['post', slug], 
    () => getPost(slug)
  )

}
