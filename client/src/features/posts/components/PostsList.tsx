import { Button } from "@nextui-org/react"
import { usePaginatedPosts } from "../hooks/usePaginatedPosts"
import { PostCard } from "./PostCard"
import { PostCardSkeleton } from "./PostCardSkeleton"



export const PostsList = () => {

  const { query } = usePaginatedPosts()

  if (query.isLoading) return (

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-4 m-5">
      {
        Array.from({ length: 10 }).map((_, index) => <PostCardSkeleton key={index} />)
      }
    </div>

  )




  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-4 m-5">
      {
        query.data.pages.flatMap(page => page.results).map(post => <PostCard key={post.id} post={post} />)
      }
      <Button 
        color={ query.hasNextPage ? 'primary' : 'default' }
        disabled={!query.hasNextPage}
        onClick={() => query.fetchNextPage()}
      >Load more</Button>
    </div>
  )
}
