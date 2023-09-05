import { api } from "../../../api/api";
import { Post } from "../../../types/post";


export const createPost = async(post: Post) => 
  await api.post("/posts/", post);


export const uploadPostImage = async(image: {post: number, image:File}) => 
  await api.post("/images/", image, { headers: { "Content-Type": "multipart/form-data", } });

