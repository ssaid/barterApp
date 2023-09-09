import { useMyPosts } from "../hooks/useMyPosts"
import { WidePostCard } from "./WidePostCard"



export const MyPostsList = () => {

  const { query } = useMyPosts()

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
