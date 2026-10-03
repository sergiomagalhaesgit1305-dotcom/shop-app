import { createContext, useContext } from "react";
import type { TChildren } from "../types/TypeChildren";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../API_URL";
import { enqueueSnackbar } from "notistack";

type TCart = {
  user_id: string;
  product_id: string;
  product_image: string;
  product_name: string;
  product_priceCents: number;
  quantity: number;
};

type TCartOrder = {
  product_image: string;
  product_name: string;
  product_priceCents: number;
  product_id: string;
  quantity: number;
};

type TCartContext = {
  cart: TCart[];
  handleAddToCart: (product: TCartOrder) => void;
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

  const { mutate: handleAddToCart } = useMutation({
    mutationFn: async (product: TCartOrder) => {
      const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to finalize pursache");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      enqueueSnackbar("Produto adicionado ao carrinho com sucesso!", {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
  });

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
        handleAddToCart,
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
