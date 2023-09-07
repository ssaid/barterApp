import { useQuery } from "@tanstack/react-query"
import * as service from "../services"



export const useMyPosts = () => {

  const query = useQuery(
    ["my-posts"],
    service.getMyPosts,
  )

  return {
    query
  }
}
