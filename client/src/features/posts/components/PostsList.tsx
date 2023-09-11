import { Button, ScrollShadow, Spinner } from "@nextui-org/react"
import { usePaginatedPosts } from "../hooks/usePaginatedPosts"
import { PostCard } from "./PostCard"



export const PostsList = () => {

  const { query } = usePaginatedPosts()

  if (query.isLoading) return <Spinner />

  return (
    <ScrollShadow hideScrollBar className="flex flex-col gap-4">
      Posts
      {
        query.data.pages.flatMap(page => page.results).map(post => <PostCard key={post.id} post={post} />)
      }
      <Button 
        color={ query.hasNextPage ? 'primary' : 'default' }
        disabled={!query.hasNextPage}
        onClick={() => query.fetchNextPage()}
      >Load more</Button>
    </ScrollShadow>
  )
}
