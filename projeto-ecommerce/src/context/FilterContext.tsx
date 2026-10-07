import { createContext, useContext, useState } from "react";
import { useProduct } from "./ProductsContext";
import type { TChildren } from "../types/TypeChildren";
import { useNavigate } from "react-router-dom";
import type { TProduct } from "../types/TypeProduct";

type TSearchContext = {
  search: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredProducts: TProduct[];
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  selectedSubcategory: string | null;
  selectSubcategory: (subcategory: string) => void;
};

const FilterContext = createContext<TSearchContext | undefined>(undefined);

export const FilterProvider = ({ children }: TChildren) => {
  const [search, setSearch] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null,
  );
  const { products } = useProduct();
  const navigate = useNavigate();

  const filteredProducts = products.filter((item) => {
    const searchProduct = item.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const subCategory = selectedSubcategory
      ? item.sub_category === selectedSubcategory
      : true;

    return searchProduct && subCategory;
  });

  const selectSubcategory = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    navigate("/products");
  };

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
    <FilterContext.Provider
      value={{
        search,
        handleChange,
        selectedSubcategory,
        selectSubcategory,
        filteredProducts,
        handleKeyDown,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error("useSearch deve ser usado dentro de um SearchProvider");
  }

  return context;
};
