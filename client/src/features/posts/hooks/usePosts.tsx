import { useMutation, useQuery } from "@tanstack/react-query"
import * as service from "../services"
import { Post } from "../../../types/post"
import { Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react"




export const usePosts = () => {

  const categories = useQuery(
    ['categories'],
    service.getCategories
  )

  const postMutation = useMutation(
    service.createPost
  )

  const navigate = useNavigate()

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

  useEffect(() => {

    if (imagesMutation.isSuccess) navigate('/user/my-posts')

  }, [imagesMutation.isSuccess])

  return {
    postMutation,
    imagesMutation,
    createPost,
    categories
  }
}
