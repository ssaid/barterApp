import { useMutation, useQuery } from "@tanstack/react-query"
import * as service from "../services"
import { Post } from "../../../types/post"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Compressor from "compressorjs"




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
        new Compressor(image, {
          quality: 0.8,
          maxWidth: 900,
          maxHeight: 900,
          mimeType: 'image/jpeg',
          success: compressedImage => {
            const fileName = `ityaimg_${Date.now()}.jpg`;
            const blob = new Blob([compressedImage], { type: 'image/jpeg' });
            const file = new File([blob], fileName, { type: 'image/jpeg' });
            imagesMutation.mutate({ image: file, post: id })
          }
        })

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
