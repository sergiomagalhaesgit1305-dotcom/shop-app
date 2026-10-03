import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, type ReactNode } from "react";
import { API_URL } from "../API_URL";

export type TProduct = {
  id: string;
  image: string;
  name: string;
  price_cents: number;
  category: string;
  description: string;
  favorite: boolean;
};

type TProductContext = {
  products: TProduct[];
};

const ProductContext = createContext<TProductContext | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
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
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
