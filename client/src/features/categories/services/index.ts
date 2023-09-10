import { api } from "../../../api/api";
import { Category } from "../../../types/category";


export const getCategories = async() => {
  const { data } = await api.get<Category[]>("/categories/");
  return data;
}
