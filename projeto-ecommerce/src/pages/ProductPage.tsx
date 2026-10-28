import { useFilter } from "../context/FilterContext";
import { Box } from "@mui/material";
import { ProductCardComponent } from "../components/ProductCardComponent";
import { Loading } from "../components/Loading";
import { useProduct } from "../context/ProductsContext";

export const ProductPage = () => {
  const { filteredProducts } = useFilter();
  const { isLoading, isError } = useProduct();

  return (
    <Box
      sx={{ width: "100%", mx: "auto", maxWidth: 1560, px: { xs: 2, md: 2 } }}
    >
      <Box
        sx={{ width: "100%", alignItems: "center", justifyContent: "center" }}
      >
        {isLoading && <Loading />}
      </Box>

      <Box
        sx={{
          mt: 2,
          gap: 1,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(auto-fill, minmax(150px, 1fr))",
            md: "repeat(auto-fill, minmax(220px, 2fr))",
          },
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCardComponent key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
};
