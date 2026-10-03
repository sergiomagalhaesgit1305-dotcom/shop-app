import { Box, Typography } from "@mui/material";
import { useCart } from "../context/CartContext";

export const CartProductQuantity = () => {
  const { cart } = useCart();
  return (
    <Typography component="span">
      {cart.reduce((acc, item) => acc + item.quantity, 0)}{" "}
    </Typography>
  );
};
