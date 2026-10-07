export type TCart = {
  user_id: string;
  product_id: string;
  product_image: string;
  product_name: string;
  product_priceCents: number;
  quantity: number;
};

export type TCartOrder = {
  product_image: string;
  product_name: string;
  product_priceCents: number;
  product_id: string;
  quantity: number;
};

export type TCartContext = {
  cart: TCart[];
  handleAddToCart: (product: TCartOrder) => void;
  handleRemoveItem: (product_id: string) => void;
  handleDecreaseItem: (product_id: string) => void;
  handleAddItem: (product_id: string) => void;
};
