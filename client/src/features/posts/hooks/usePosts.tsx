import { useMutation } from "@tanstack/react-query"
import * as service from "../services"
import { Post } from "../../../types/post"
import { Navigate } from "react-router-dom"




export const usePosts = () => {

  const postMutation = useMutation(
    service.createPost
  )

  const imagesMutation = useMutation(
    service.uploadPostImage
  )

  const createPost = async(values: Post) => {
    const { data } = await postMutation.mutateAsync(values)

    if (data && data.id){
      const { id } = data

      values.images.forEach(image => {
        imagesMutation.mutate({ image, post: id })
      })

      if (imagesMutation.isSuccess){
        return <Navigate to="/user/my-posts" />
      }
    }



  }


  return {
    postMutation,
    imagesMutation,
    createPost
  }
}
