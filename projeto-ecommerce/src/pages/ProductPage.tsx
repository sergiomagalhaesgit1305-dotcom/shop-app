import { useNavigate } from "react-router-dom";
import { FormatedPrice } from "../utils/FormatPrice";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
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

export const ProductPage = () => {
  const navigate = useNavigate();
  const { handleAddToCart } = useCart();
  const { user } = useAuth();
  const { filteredProducts } = useSearch();
  const { favorites, addToFavorite } = useFavorite();

  return (
    <Box
      sx={{ width: "100%", mx: "auto", maxWidth: 1560, px: { md: 2 }, py: 2 }}
    >
      <Box
        sx={{
          p: 2,
          gap: 3,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 2fr))",
        }}
      >
        {filteredProducts.map((product) => {
          const isFavorite = favorites.some(
            (fav) => fav.product_id === product.id,
          );

          return (
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minWidth: "200px",
                borderRadius: 3,
              }}
              key={product.id}
            >
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  backgroundColor: "#fff",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  flexGrow: 1,
                  p: 2,
                  gap: 1,
                }}
              >
                <Typography
                  color="text.secondary"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "2.6em",
                  }}
                >
                  {product.name}
                </Typography>
                <Typography>{FormatedPrice(product.price_cents)}</Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  pb: 2,
                  pt: 0,
                  width: "100%",
                }}
              >
                <Button
                  onClick={() =>
                    addToFavorite({
                      product_id: product.id,
                      product_image: product.image,
                      product_name: product.name,
                      product_priceCents: product.price_cents,
                    })
                  }
                >
                  {isFavorite ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </Button>
                <Box sx={{ height: "100%" }}>
                  <Button
                    onClick={() => {
                      user
                        ? handleAddToCart({
                            product_id: product.id,
                            product_name: product.name,
                            product_image: product.image,
                            product_priceCents: product.price_cents,
                            quantity: 1,
                          })
                        : navigate("/login");
                    }}
                  >
                    Comprar
                  </Button>
                </Box>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
