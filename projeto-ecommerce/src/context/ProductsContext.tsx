import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState, type ReactNode } from "react";
import { API_URL } from "../API_URL";
import type { TChildren } from "../types/TypeChildren";
import type { TProduct, TProductContext } from "../types/TypeProduct";

const ProductContext = createContext<TProductContext | undefined>(undefined);

export const ProductProvider = ({ children }: TChildren) => {
  const { data: products = [] } = useQuery<TProduct[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products`);

      if (!response.ok) {
        throw new Error("Erro ao carregar os produtos");
      }

      const data = await response.json();
      return data;
    },
  });
  return (
    <ProductContext.Provider
      value={{
        products,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct deve ser usado dentro de um ProductProvider");
  }

  return context;
};
