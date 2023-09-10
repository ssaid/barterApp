

export type Category = {
  id: number;
  name: string;
  image: string | null;
  icon: string | null;
  slug: string | null;
  parent: Category | null;
}
