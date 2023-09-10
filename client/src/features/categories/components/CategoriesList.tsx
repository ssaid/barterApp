import { useCategories } from "../hooks/useCategories"
import { CategoryCard } from "./CategoryCard"
import { CategorySkeleton } from "./CategorySkeleton"



export const CategoriesList = () => {

  const { categories } = useCategories()

  if (categories.isLoading) return (
    <div className="flex gap-2 m-w-screen overflow-auto p-2">
      {
        Array.from({ length: 6 }).map((_, index) => <CategorySkeleton key={index} />)
      }
    </div>
  )

  return (
    <div className="flex gap-2 m-w-screen overflow-auto p-2">
      {
        categories.data.map(category => 
          <CategoryCard key={category.id} category={category} />
        )
      }
    </div>
  )
}
