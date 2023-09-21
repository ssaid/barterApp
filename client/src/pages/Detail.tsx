import { useParams } from "react-router-dom"
import { Post } from "../features/post-detail/components/Post"


export const Detail = () => {

  const { slug } = useParams()

  return (
    <div className="container mx-auto m-5">
      <Post slug={slug} />
    </div>
  )
}
