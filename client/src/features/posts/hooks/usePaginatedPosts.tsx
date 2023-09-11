import { useInfiniteQuery } from "@tanstack/react-query"
import * as service from "../services"



export const usePaginatedPosts = () => {


  const query = useInfiniteQuery(
    ['posts'],
    service.getPaginatedPosts,
    {
      getNextPageParam: (lastPage) => lastPage.next,
      staleTime: 1000 * 60 * 5
    }
  )

  return {
    query
  }



}
