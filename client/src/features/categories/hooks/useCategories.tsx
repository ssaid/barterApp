import { useQuery } from "@tanstack/react-query"
import * as service from "../services"


export const useCategories = () => {

  const categories = useQuery(
    ['categories'],
    service.getCategories,
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 5
    }
  )

  return {
    categories
  }
}
