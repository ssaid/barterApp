

export type Category = {
  id: number;
  name: string;
  image: ImageSizes | null;
  icon: string | null;
  slug: string | null;
  parent: Category | null;
}

export type ImageSizes = {
  full_size: string;
  thumbnail: string;
  medium_square_crop: string;
  small_square_crop: string;
}

