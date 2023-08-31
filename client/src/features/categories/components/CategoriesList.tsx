import { CategoryCard } from "./CategoryCard"
import { CategorySkeleton } from "./CategorySkeleton"




export const CategoriesList = () => {
  const categories = [
    { 
      id: 1, 
      name: "Viajes",
      img: "https://media.gq.com.mx/photos/620e915c43f71a078a35533f/3:2/w_3000,h_2000,c_limit/playa.jpg",
    },
    {
      id: 2,
      name: "Arte",
      img: "https://ichef.bbci.co.uk/news/640/cpsprodpb/17C16/production/_117320379_giocondacerca.jpg",
    },
    {
      id: 3,
      name: "Category 3",
      img: "https://media.gq.com.mx/photos/620e915c43f71a078a35533f/3:2/w_3000,h_2000,c_limit/playa.jpg",
    },
    { 
      id: 4, 
      name: "Category 4",
      img: "https://media.gq.com.mx/photos/620e915c43f71a078a35533f/3:2/w_3000,h_2000,c_limit/playa.jpg",
    },
    {
      id: 5,
      name: "Category 5",
      img: "https://media.gq.com.mx/photos/620e915c43f71a078a35533f/3:2/w_3000,h_2000,c_limit/playa.jpg",
    },
    {
      id: 6,
      name: "Category 6",
      img: "https://media.gq.com.mx/photos/620e915c43f71a078a35533f/3:2/w_3000,h_2000,c_limit/playa.jpg",
    }
  ]

  const isLoading = false

  if (isLoading) return (
    <div className="flex gap-2 m-w-screen overflow-auto p-2">
      {
        Array.from({ length: 6 }).map((_, index) => <CategorySkeleton key={index} />)
      }
    </div>
  )

  return (
    <div className="flex gap-2 m-w-screen overflow-auto p-2">
      {
        categories.map(category => 
          <CategoryCard key={category.id} category={category} />
        )
      }
    </div>
  )
}
