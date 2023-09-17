import { useMutation } from "@tanstack/react-query";
import * as service from "../services"



export const usePostCard = () => {

  const likeMutation = useMutation(
    service.likePost
  )

  const unlikeMutation = useMutation(
    service.unlikePost
  )

  return {
    like: likeMutation.mutateAsync,
    unlike: unlikeMutation.mutateAsync,
  }
}
