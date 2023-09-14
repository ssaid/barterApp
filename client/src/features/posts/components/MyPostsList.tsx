import { useMyPosts } from "../hooks/useMyPosts"
import { WidePostCard } from "./WidePostCard"
import { EmptyRequestCard } from "../../../components/EmptyRequestCard"
import { LoadingWithBackdrop } from "../../../components/LoadingWithBackdrop"



export const MyPostsList = () => {

  const { query } = useMyPosts()

  if (query.isLoading) return <LoadingWithBackdrop />

  if (query.data?.length === 0) return <EmptyRequestCard />

  if (query.data) return (
    <div className="flex flex-col items-center gap-4 mt-5 px-3">
      {
        query.data.map(post => (
          <WidePostCard key={post.id} post={post} />
        ))
      }
    </div>
  )

}
