import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useFavorite } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";
import { FormatedPrice } from "../../utils/FormatPrice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ProfileTitle } from "../../components/ProfileTitle";
import { useIsMobile } from "../../components/useIsMobile";

export const FavoritesPage = () => {
  const { favorites, removeFromFavorite } = useFavorite();
  const { handleAddToCart } = useCart();
  const isMobile = useIsMobile();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {!isMobile && <ProfileTitle />}
      <Box>
        {favorites.length === 0 && (
          <Typography>
            Guarda os teus favoritos e encontra-os aqui sempre que quiseres, de
            forma rápida e simples.
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "grid" },
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: 2,
        }}
      >
        {favorites.map((item) => (
          <Box key={item.product_id}>
            <Card>
              <CardContent sx={{ display: "flex", gap: 2 }}>
                <Box
                  component="img"
                  src={item.product_image}
                  alt={item.product_name}
                  sx={{
                    width: 200,
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6">{item.product_name}</Typography>

                  <Typography sx={{ fontWeight: "bold" }}>
                    {FormatedPrice(item.product_priceCents)}
                  </Typography>
                  <Button
                    sx={{ gap: 1 }}
                    onClick={() => removeFromFavorite(item.product_id)}
                  >
                    <FavoriteIcon sx={{ color: "red" }} />
                    <Typography>Remover</Typography>
                  </Button>
                  <Button
                    fullWidth
                    sx={{
                      height: 45,
                      backgroundColor: "orange",
                      color: "white",
                      "&:hover": { bgcolor: "#e67e00" },
                      borderRadius: 1,
                    }}
                    onClick={() => {
                      handleAddToCart({
                        product_id: item.product_id,
                        product_name: item.product_name,
                        product_image: item.product_image,
                        product_priceCents: item.product_priceCents,
                        quantity: 1,
                      });
                    }}
                  >
                    Comprar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
