import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import { useFavorite } from "../../context/FavoritesContext";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link } from "react-router-dom";
import { FormatedPrice } from "../../utils/FormatPrice";
import { useCart } from "../../context/CartContext";
import type { TDrawer } from "../../types/TypeDrawer";

export const FavoriteDrawer = ({ open, onClose }: TDrawer) => {
  const { favorites, addToFavorite, removeFromFavorite } = useFavorite();
  const { handleCart } = useCart();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            m: 2,
            height: "calc(100% - 32px)",
            borderRadius: 3,
            width: 460,
            overflow: "hidden",
          },
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={onClose}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontSize: 25 }}>Favoritos</Typography>

        <Divider />

        <List>
          {favorites.length === 0 ? (
            <Typography
              color="text.secondary"
              sx={{
                textAlign: "center",
                py: 8,
              }}
            >
              Ainda não tens produtos nos favoritos
            </Typography>
          ) : (
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                  mt: 1,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Total ({favorites.length} Items)
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  {FormatedPrice(
                    favorites.reduce(
                      (acc, item) => acc + item.product_priceCents,
                      0,
                    ),
                  )}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {favorites.map((item) => (
                <Box
                  key={item.product_id}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={item.product_image}
                    alt={item.product_name}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                  <Box
                    sx={{ display: "flex", flexDirection: "column", flex: 1 }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        lineHeight: 1.2,
                        mb: 2,
                      }}
                    >
                      {item.product_name}
                    </Typography>

                    <Typography sx={{ mt: 1, fontWeight: "bold" }}>
                      {FormatedPrice(item.product_priceCents)}
                    </Typography>
                    <button
                      onClick={() => {
                        handleCart(
                          item.product_image,
                          item.product_name,
                          item.product_priceCents,
                          item.product_id,
                          1,
                        );
                      }}
                    >
                      Comprar
                    </button>
                  </Box>
                  <IconButton
                    onClick={() => removeFromFavorite(item.product_id)}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
              ))}
            </>
          )}
        </List>

        {favorites.length > 0 && (
          <>
            <Divider />

            <Box
              sx={{
                display: " flex",
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                component={Link}
                to="/me/favoritos"
                onClick={onClose}
                fullWidth
                sx={{
                  height: "56px",
                  bgcolor: "background.default",
                  color: "text.primary",
                  "&:hover": { bgcolor: "background.default" },
                  borderRadius: 1,
                }}
              >
                Ver e Editar Favoritos
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};
