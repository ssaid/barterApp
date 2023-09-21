import { ContactMethod } from "./user";

export type Post = {
  id?: number;
  slug?: string;
  title: string;
  description: string;
  categories: Category[] | number[];
  like_count: number;
  interactions: number;
  is_liked: boolean;
  state: 'draft' | 'active' | 'done';
  images: File[] | Image[];
  contacts?: Contact[];
}

export type Image = {
  id: number;
  image: ImageSizes
}

export type ImageSizes = {
  full_size: string;
  thumbnail: string;
  large_square_crop: string;
  medium_square_crop: string;
  small_square_crop: string;
}

export type Category = {
  id: number;
  name: string;
  image: ImageSizes | null;
  icon: string | null;
  slug: string | null;
  parent: Category | null;
}

export type PaginatedPostResponse =  {
    count:    number;
    next:     string | null;
    previous: string | null;
    results:  Post[];
}

export type Contact = {
  id: number
  contact_method: ContactMethod,
  contact: string
}
