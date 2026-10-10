import { useFilter } from "../context/FilterContext";
import { Box } from "@mui/material";
import { ProductCardComponent } from "../components/ProductCardComponent";

export const ProductPage = () => {
  const { filteredProducts } = useFilter();

  return (
    <Box sx={{ width: "100%", mx: "auto", maxWidth: 1560 }}>
      <Box
        sx={{
          mt: 2,
          gap: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 2fr))",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCardComponent key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
};
