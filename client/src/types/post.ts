


export type Post = {
  title: string;
  description: string;
  post_categories: Category[] | number[];
  interactions: number;
  state: 'draft' | 'active' | 'done';
  image_ppal: File | string;
  images: File[] | string[];
}

export type Category = {
  id?: number;
  name: string;
}
