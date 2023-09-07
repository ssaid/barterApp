import { api } from "../../../api/api";
import { Post } from "../../../types/post";


export const createPost = async(post: Post) => 
  await api.post("/myposts/", post);


export const uploadPostImage = async(image: {post: number, image:File}) => 
  await api.post("/images/", image, { headers: { "Content-Type": "multipart/form-data", } });

export const getMyPosts = async() => {
  const { data } = await api.get<Post[]>("/myposts/");
  return data;
}

export const patchPost = async(post: Partial<Post>) => 
  await api.patch<Post>(`/myposts/${post.id}/`, post);
