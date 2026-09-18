import { createContext, useContext, useState } from "react";
import { useProduct, type TProduct } from "./ProductsContext";
import type { TChildren } from "../types/TypeChildren";
import { useNavigate } from "react-router-dom";

type TSearchContext = {
  search: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredProducts: TProduct[];
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const SearchContext = createContext<TSearchContext | undefined>(undefined);

export const SearchProvider = ({ children }: TChildren) => {
  const [search, setSearch] = useState("");
  const { products } = useProduct();
  const navigate = useNavigate();

  const filteredProducts = (products || []).filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    navigate("/products");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate("/products");
    }
  };
  return (
    <SearchContext.Provider
      value={{ search, handleChange, filteredProducts, handleKeyDown }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch deve ser usado dentro de um SearchProvider");
  }

  return context;
};
