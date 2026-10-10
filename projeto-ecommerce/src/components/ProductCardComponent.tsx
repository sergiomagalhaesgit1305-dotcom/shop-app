import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useFavorite } from "../context/FavoritesContext";
import { FormatedPrice } from "../utils/FormatPrice";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import type { TProduct } from "../types/TypeProduct";

export const ProductCardComponent = ({ product }: { product: TProduct }) => {
  const navigate = useNavigate();
  const { favorites, addToFavorite, removeFromFavorite } = useFavorite();
  const { handleAddToCart } = useCart();

  const isFavorite = favorites.some((fav) => fav.product_id === product.id);

  return (
    <Card key={product.id} elevation={3}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          textAlign: "left",
          flexGrow: 1,
          p: 2,
          gap: 1,
        }}
      >
        <Box
          onClick={() => navigate(`/product/${product.id}`)}
          sx={{
            width: "100%",
            height: 200,
            bgcolor: "#ffffff",
            borderRadius: 2,
            p: 1,
            cursor: "pointer",
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 1,
            }}
          />
        </Box>
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
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Typography>{FormatedPrice(product.price_cents)}</Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          pb: 2,
          pt: 0,
          width: "100%",
        }}
      >
        <Button
          onClick={() => {
            if (isFavorite) {
              removeFromFavorite(product.id);
            } else {
              addToFavorite({
                product_id: product.id,
                product_image: product.image,
                product_name: product.name,
                product_priceCents: product.price_cents,
              });
            }
          }}
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
              handleAddToCart({
                product_id: product.id,
                product_name: product.name,
                product_image: product.image,
                product_priceCents: product.price_cents,
                quantity: 1,
              });
            }}
          >
            Comprar
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
