import { useParams } from "react-router-dom"
import { EditPostForm } from "../features/edit-post/components/EditPostForm"


export const EditPost = () => {

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-64px)] p-5">
      <EditPostForm />
    </main>
  )
}

export default EditPost
