import { api } from "../../../api/api";
import { Category } from "../../../types/category";
import { PaginatedPostResponse, Post } from "../../../types/post";


export const createPost = async(post: Post) => 
  await api.post("/myposts/", post);

export const likePost = async(id: number) => 
  await api.post<{ likes: number }>(`/posts/${id}/like/`);

export const unlikePost = async(id: number) => 
  await api.post<{ likes: number }>(`/posts/${id}/unlike/`);

export const uploadPostImage = async(image: {post: number, image:File}) => 
  await api.post("/images/", image, { headers: { "Content-Type": "multipart/form-data", } });

export const getMyPosts = async() => {
  const { data } = await api.get<Post[]>("/myposts/");
  return data;
}

export const getCategories = async() => {
  const { data } = await api.get<Category[]>("/categories/");
  return data;
}

export const patchPost = async(post: Partial<Post>) => 
  await api.patch<Post>(`/myposts/${post.id}/`, post);

export const getPaginatedPosts = async({ pageParam = '/posts/?limit=30' }) => {

  const { data } = await api.get<PaginatedPostResponse>(pageParam);
  return data;
}
