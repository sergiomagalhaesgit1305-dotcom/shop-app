export type TFavorite = {
  user_id: string;
  product_id: string;
  product_image: string;
  product_name: string;
  product_priceCents: number;
};

export type AddFavorite = {
  product_id: string;
  product_image: string;
  product_name: string;
  product_priceCents: number;
};

export type TFavoriteContext = {
  favorites: TFavorite[];
  addToFavorite: (product: AddFavorite) => void;
  removeFromFavorite: (product_id: string) => void;
};
