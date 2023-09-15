import { useInfiniteQuery } from "@tanstack/react-query"
import * as service from "../services"
import { parseURLParams } from "../../../utils/parseURLParams"


type Props = {
  category: string
  search: string
}

export const usePaginatedPosts = (filters: Props) => {

  const params = parseURLParams(filters)
  params.append('limit', '30')

  const query = useInfiniteQuery(
    ['posts', filters],
    () => service.getPaginatedPosts({ pageParam: '/posts/?' + params.toString() }),
    
    {
      getNextPageParam: (lastPage) => lastPage.next,
      staleTime: 1000 * 60 * 5
    }
  )

  return {
    query
  }



}
