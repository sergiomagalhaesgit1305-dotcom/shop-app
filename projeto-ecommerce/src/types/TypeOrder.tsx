export type TOrderItem = {
  id: string;
  product_id: string;
  product_name: string;
  product_priceCents: number;
  product_image: string;
  quantity: number;
};

export type TOrder = {
  id: string;
  total_cents: number;
  created_at: string;
  order_items: TOrderItem[];
};

export type TCreateOrderItem = {
  product_id: string;
  product_name: string;
  product_priceCents: number;
  product_image: string;
  quantity: number;
};

export type TOrderContext = {
  order: TOrder[] | null;
  FinalizePurchase: (order: TCreateOrderItem[]) => void;
};
