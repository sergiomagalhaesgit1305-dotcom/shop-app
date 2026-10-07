export type TProduct = {
  id: string;
  image: string;
  name: string;
  price_cents: number;
  category: string;
  sub_category: string;
  description: string;
  favorite: boolean;
};

export type TProductContext = {
  products: TProduct[];
};
