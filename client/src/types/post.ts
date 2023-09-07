


export type Post = {
  id?: number;
  title: string;
  description: string;
  categories: Category[] | number[];
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
  medium_square_crop: string;
  small_square_crop: string;
}



export type Category = {
  id?: number;
  name: string;
}
