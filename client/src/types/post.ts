


export type Post = {
  title: string;
  description: string;
  categories: Category[] | number[];
  interactions: number;
  state: 'draft' | 'active' | 'done';
  images: File[] | string[];
}

export type Category = {
  id?: number;
  name: string;
}
