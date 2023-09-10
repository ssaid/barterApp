import { useQuery } from "@tanstack/react-query"
import * as service from "../services"


export const useCategories = () => {

  const categories = useQuery(
    ['categories'],
    service.getCategories
  )

  return {
    categories
  }
}
