import { createContext, useContext } from "react";
import type { TChildren } from "../types/TypeChildren";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../API_URL";
import { enqueueSnackbar } from "notistack";
import type { TCart, TCartContext, TCartOrder } from "../types/TypeCart";

const CartContext = createContext<TCartContext | undefined>(undefined);

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
    onError: () => {
      enqueueSnackbar("Nao foi possivel adicionar o produto ao carrinho!", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
  });

  const { mutate: handleAddItem } = useMutation({
    mutationFn: async (product_id: string) => {
      const response = await fetch(`${API_URL}/cart/addItem/${product_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to finalize purchase");
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
    onError: () => {
      enqueueSnackbar("Nao foi possivel adicionar o produto ao carrinho!", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
  });

  const { mutate: handleDecreaseItem } = useMutation({
    mutationFn: async (product_id: string) => {
      const response = await fetch(`${API_URL}/cart/removeItem/${product_id}`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to finalize pursache");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      enqueueSnackbar("Quantidade atualizada!", {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
    onError: () => {
      enqueueSnackbar("Nao foi possivel atualizar a quantidade do carrinho!", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
  });

  const { mutate: handleRemoveItem } = useMutation({
    mutationFn: async (product_id: string) => {
      const response = await fetch(`${API_URL}/cart/${product_id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to finalize pursache");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      enqueueSnackbar("Produto removido do carrinho com sucesso!", {
        variant: "info",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
    onError: () => {
      enqueueSnackbar("Nao foi possivel remover o producto do carrinho!", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
  });

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleDecreaseItem,
        handleRemoveItem,
        handleAddItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }

  return context;
};
