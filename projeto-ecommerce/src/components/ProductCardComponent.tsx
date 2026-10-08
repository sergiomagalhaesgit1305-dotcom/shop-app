import { useFavorite } from "../context/FavoritesContext";
import { useFilter } from "../context/FilterContext";

export const FilterComponent = () => {
  const { filteredProducts } = useFilter();
  const { favorites } = useFavorite();
  return (
    <>
      {filteredProducts.map((product) => {
        const isFavorite = favorites.some(
          (fav) => fav.product_id === product.id,
        );
      })}
    </>
  );
};
