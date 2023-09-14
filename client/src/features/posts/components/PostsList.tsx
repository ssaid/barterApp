import { Spinner } from "@nextui-org/react"
import { usePaginatedPosts } from "../hooks/usePaginatedPosts"
import { PostCard } from "./PostCard"
import { PostCardSkeleton } from "./PostCardSkeleton"



export const PostsList = () => {

  const { query } = usePaginatedPosts()

  if (query.isLoading) return (

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-4 m-5 container-xl">
      {
        Array.from({ length: 10 }).map((_, index) => <PostCardSkeleton key={index} />)
      }
    </div>

  )

  const PAGE_SIZE = 30

  return (
    <div className="container mx-auto m-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-4">
        {
          query.data.pages
          .flatMap(page => page.results)
          .map(
            (post, i) => 
              <PostCard 
                key={post.id} 
                post={post}  
                fetchesOnVisible={
                  (i % (PAGE_SIZE - 10) === 0) && query.hasNextPage && !query.isFetchingNextPage
                }
                fetchNextPage={query.fetchNextPage}
              />
          )
        }
      </div>
      {
        query.hasNextPage && (
          <div className="flex justify-center mt-5">
            <Spinner />
          </div>
        )
      }
    </div>
  )
}
