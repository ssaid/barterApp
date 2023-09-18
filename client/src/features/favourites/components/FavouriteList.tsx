import { EmptyRequestCard } from "../../../components/EmptyRequestCard";
import { useFavourites } from "../hooks/useFavourites";
import { FavouriteCard } from "./FavouriteCard";
import { FavouriteCardSkeleton } from "./FavouriteCardSkeleton";



export const FavouriteList = () => {

  const { data, isLoading } = useFavourites();


  if (isLoading) return (

    <div className="container mx-auto m-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-4">
        {
          Array.from({ length: 5 }).map((_, index) => <FavouriteCardSkeleton key={index} />)
        }
      </div>
    </div>

  )

  if (data.length === 0) return <EmptyRequestCard />


  return (
    <div className="container mx-auto m-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-4">
        {
          data.map( post => <FavouriteCard key={post.id} post={post} />)
        }
      </div>
    </div>
  )


}
