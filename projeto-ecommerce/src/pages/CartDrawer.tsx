import { useCart } from "../context/CartContext";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { FormatedPrice } from "../utils/FormatPrice";
import { Link } from "react-router-dom";

type CartDrawer = {
  open: boolean;
  onClose: () => void;
};

export const CartDrawer = ({ open, onClose }: CartDrawer) => {
  const { cart, handleRemoveItem } = useCart();

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
        <Typography sx={{ fontSize: 25 }}>Carrinho de Compras</Typography>

        <Divider />

        <List>
          {cart.length === 0 && (
            <Typography
              color="text.secondary"
              sx={{
                textAlign: "center",
                py: 8,
              }}
            >
              Ainda não tens produtos no carrinho.
            </Typography>
          )}
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
              Total ({cart.reduce((acc, item) => acc + item.quantity, 0)} Items)
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {FormatedPrice(
                cart.reduce((acc, item) => acc + item.product_priceCents, 0),
              )}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          {cart.map((item) => (
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
              <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    lineHeight: 1.2,
                    mb: 2,
                  }}
                >
                  {item.product_name}
                </Typography>
                <Typography color="text.secondary">
                  Quantidade: {item.quantity}
                </Typography>
                <Typography sx={{ mt: 1, fontWeight: "bold" }}>
                  {FormatedPrice(item.product_priceCents)}
                </Typography>
              </Box>
              <IconButton onClick={() => handleRemoveItem(item.product_id)}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            component={Link}
            to="/cart"
            fullWidth
            sx={{
              height: "56px",
              bgcolor: "background.default",
              color: "text.primary",
              "&:hover": { bgcolor: "background.default" },
              borderRadius: 1,
            }}
          >
            Ver e Editar
          </Button>
          <Button
            type="submit"
            fullWidth
            sx={{
              height: "56px",
              backgroundColor: "orange",
              color: "white",
              "&:hover": { bgcolor: "#e67e00" },
              borderRadius: 1,
            }}
          >
            Finalizar Compra
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
