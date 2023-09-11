
export type Post = {
  id?: number;
  title: string;
  description: string;
  categories: Category[] | number[];
  likes: number;
  interactions: number;
  state: 'draft' | 'active' | 'done';
  images: File[] | Image[];
}

export type Image = {
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
