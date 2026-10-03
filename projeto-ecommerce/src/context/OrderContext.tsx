import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../API_URL";
import { createContext } from "react";
import { useContext } from "react";
import type { TChildren } from "../types/TypeChildren";
import { useNavigate } from "react-router-dom";

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
type TContextOrder = {
  order: TOrder[] | null;
  FinalizePursache: (order: TCreateOrderItem[]) => void;
};

const OrderContext = createContext<TContextOrder | undefined>(undefined);

export const OrderProvider = ({ children }: TChildren) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: order = null } = useQuery<TOrder[] | null>({
    queryKey: ["order"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/order`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      return await response.json();
    },
  });

  const { mutate: FinalizePursache } = useMutation({
    mutationFn: async (order: TCreateOrderItem[]) => {
      const response = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to finalize pursache");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      navigate("/");
    },
  });

  return (
    <OrderContext.Provider value={{ order, FinalizePursache }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder deve ser usado dentro de um OrderProvider");
  }
  return context;
};
