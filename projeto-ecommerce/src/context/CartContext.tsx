import { createContext, useContext } from "react";
import type { TChildren } from "../types/TypeChildren";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../API_URL";

type TCart = {
  user_id: string;
  product_id: string;
  product_image: string;
  product_name: string;
  product_priceCents: number;
  quantity: number;
};

type TCartContext = {
  cart: TCart[];
  handleCart: (
    product_image: string,
    product_name: string,
    product_priceCents: number,
    product_id: string,
    quantity: number,
  ) => void;
  handleRemoveItem: (product_id: string) => void;
  handleDecreaseItem: (product_id: string) => void;
  handleAddItem: (product_id: string) => void;
};

const cartContext = createContext<TCartContext | undefined>(undefined);

export const CartProvider = ({ children }: TChildren) => {
  const queryClient = useQueryClient();

  const { data } = useQuery<TCart[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/cart`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      return await response.json();
    },
    retry: false,
  });

  const cart = data || [];

  const handleCart = async (
    product_image: string,
    product_name: string,
    product_priceCents: number,
    product_id: string,
    quantity: number,
  ) => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          product_image,
          product_name,
          product_priceCents,
          product_id,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (error: any) {
      console.log(`${error.message}`);
    }
  };

  const handleAddItem = async (product_id: string) => {
    try {
      const response = await fetch(`${API_URL}/cart/addItem/${product_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (error: any) {
      console.log(`${error.message}`);
    }
  };

  const handleDecreaseItem = async (product_id: string) => {
    try {
      const response = await fetch(`${API_URL}/cart/removeItem/${product_id}`, {
        method: "PATCH",

        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (error: any) {
      console.log(`${error.message}`);
    }
  };

  const handleRemoveItem = async (product_id: string) => {
    try {
      const response = await fetch(`${API_URL}/cart/${product_id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item from cart");
      }

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (error: any) {
      console.log(`${error.message}`);
    }
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        handleCart,
        handleDecreaseItem,
        handleRemoveItem,
        handleAddItem,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(cartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }

  return context;
};
