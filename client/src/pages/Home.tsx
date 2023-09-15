import { useEffect, useState } from "react"
import { CategoriesList } from "../features/categories/components/CategoriesList"
import { PostsList } from "../features/posts/components/PostsList"
import { useLocation } from "react-router-dom"


export const Home = () => {

  const location = useLocation()
  const [ search, setSearch ] = useState<string | undefined>()
  const [ category, setCategory ] = useState<string | undefined>()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const category = params.get('category')
    const search = params.get('search')

    setCategory(category)
    setSearch(search)

  }, [location.search])

  return (
    <div className="w-full flex flex-col justify-center p-2">
      <CategoriesList />
      <PostsList category={category} search={search}/>
    </div>
  )
}
