import { createContext, useContext, useState } from "react";
import { useProduct } from "./ProductsContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../API_URL";
import type { TChildren } from "../types/TypeChildren";

type TFavorite = {
  user_id: string;
  product_id: string;
  product_image: string;
  product_name: string;
  product_priceCents: number;
};

type AddFavorite = {
  product_id: string;
  product_image: string;
  product_name: string;
  product_priceCents: number;
};

type TFavoriteContext = {
  favorites: TFavorite[];
  addToFavorite: (product: AddFavorite) => void;
  removeFromFavorite: (product_id: string) => void;
};

const FavoriteContext = createContext<TFavoriteContext | undefined>(undefined);

export const FavoriteProvider = ({ children }: TChildren) => {
  const queryCLient = useQueryClient();

  const { data: favorites = [] } = useQuery<TFavorite[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/favorites`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar os favoritos");
      }

      return await response.json();
    },
  });

  const { mutate: addToFavorite } = useMutation({
    mutationFn: async ({ product_id }: AddFavorite) => {
      const response = await fetch(`${API_URL}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update username");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const { mutate: removeFromFavorite } = useMutation({
    mutationFn: async (product_id: string) => {
      const response = await fetch(`${API_URL}/favorites/${product_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update username");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorite, removeFromFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error("useFavorite deve ser usado dentro de um FavoriteProvider");
  }
  return context;
};
