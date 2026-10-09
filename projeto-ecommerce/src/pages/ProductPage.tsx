import { useNavigate } from "react-router-dom";
import { FormatedPrice } from "../utils/FormatPrice";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useFilter } from "../context/FilterContext";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useFavorite } from "../context/FavoritesContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
