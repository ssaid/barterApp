import { CategoriesList } from "../features/categories/components/CategoriesList"
import { PostsList } from "../features/posts/components/PostsList"


export const Home = () => {
  return (
    <div className="w-full flex flex-col justify-center p-2">
      <CategoriesList />
      <PostsList />
    </div>
  )
}
