import { Card, CardBody, Spinner } from "@nextui-org/react"
import { usePaginatedPosts } from "../hooks/usePaginatedPosts"
import { PostCard } from "./PostCard"
import { PostCardSkeleton } from "./PostCardSkeleton"
import { BiSolidInvader } from "react-icons/bi"



export const PostsList = () => {

  const { query } = usePaginatedPosts()

  if (query.isLoading) return (

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-4 m-5 container-xl">
      {
        Array.from({ length: 10 }).map((_, index) => <PostCardSkeleton key={index} />)
      }
    </div>

  )

  if (query.data.pages[0].results.length === 0) return (
  <div className="flex justify-center w-full p-2 absolute top-1/2 left-0">
    <Card className="w-full">
      <CardBody>
        <p className="text-center">Ups. al parecer no hay nada aqui 👾
        </p>
      </CardBody>
    </Card>
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
