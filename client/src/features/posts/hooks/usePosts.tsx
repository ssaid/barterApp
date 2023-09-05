import { useMutation } from "@tanstack/react-query"
import * as service from "../services"
import { Post } from "../../../types/post"




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

    }



  }


  return {
    postMutation,
    imagesMutation,
    createPost
  }
}
