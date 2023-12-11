import { useQuery } from "@tanstack/react-query";
import { Category } from "../types/category";
import { api } from "../api/api";


const getCategories = async() => {
  const { data } = await api.get<Category[]>("/categories/");
  return data;
}

export const useCategories = useQuery(
    ['categories'],
    getCategories
  )
