import { createContext, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../API_URL";
import type { TChildren } from "../types/TypeChildren";
import { enqueueSnackbar } from "notistack";
import type {
  AddFavorite,
  TFavorite,
  TFavoriteContext,
} from "../types/TypeFavorite";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const FavoriteContext = createContext<TFavoriteContext | undefined>(undefined);

export const FavoriteProvider = ({ children }: TChildren) => {
  const { user } = useAuth();
  const queryCLient = useQueryClient();
  const navigate = useNavigate();

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
    enabled: !!user,
  });

  const { mutate: addToFavoriteMutation } = useMutation({
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
        throw new Error("Failed to add Product to Favorites");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: ["favorites"] });

      enqueueSnackbar("Produto adicionado aos Favoritos com sucesso!", {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
    onError: () => {
      enqueueSnackbar("Nao foi possivel adicionar o produto aos favoritos", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
  });

  const addToFavorite = (data: AddFavorite) => {
    if (!user) {
      enqueueSnackbar(
        "Para adicionar produtos aos favoritos tem que ter a sessão iniciada.",
        {
          variant: "info",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        },
      );
      return navigate("/login");
    }
    addToFavoriteMutation(data);
  };

  const { mutate: removeFromFavorite } = useMutation({
    mutationFn: async (product_id: string) => {
      const response = await fetch(`${API_URL}/favorites/${product_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to remove Product from Favorites");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: ["favorites"] });

      enqueueSnackbar("Produto removido dos Favoritos com sucesso!", {
        variant: "info",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
    onError: () => {
      enqueueSnackbar("Nao foi possivel remover o produto dos favoritos", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
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
