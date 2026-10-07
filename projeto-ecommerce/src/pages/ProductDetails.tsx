import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useProduct } from "../context/ProductsContext";
import { useNavigate, useParams } from "react-router-dom";
import { FormatedPrice } from "../utils/FormatPrice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useProduct();
  const { user } = useAuth();

  const { handleAddToCart } = useCart();
  const [quantityProduct, setQuantityProduct] = useState<number>(1);
  const product = products.find((product) => String(product.id) === String(id));

  if (!product) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6">Produto não encontrado</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{ width: "100%", mx: "auto", maxWidth: 1560, px: { xs: 2, md: 3 } }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flex: 3,
          mt: 2,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 2,
            borderRadius: 2,
          }}
        >
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Box
                sx={{
                  p: 2,
                  gap: 3,
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 2fr)" },
                }}
              >
                {Array.from({ length: 4 }).map((_, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={`${product.image}?w=164&h=164&fit=crop&auto=format`}
                    alt={`${product.name} ${index + 1}`}
                    loading="lazy"
                    sx={{
                      width: "100%",
                      height: 400,
                      borderRadius: 2,
                      display: {
                        xs: index === 0 ? "block" : "none",
                        md: "block",
                      },
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Card
          sx={{
            flex: 1,
          }}
        >
          <CardContent>
            <Box
              sx={{
                flex: 1,
                gap: 4,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">{product.name}</Typography>
              <Typography>{FormatedPrice(product.price_cents)}</Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Box
                  sx={{
                    width: "25%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #333333",
                    px: 0.5,
                    py: 0.2,
                  }}
                >
                  <IconButton
                    size="small"
                    disabled={quantityProduct <= 1}
                    onClick={() => {
                      setQuantityProduct((prev) => prev - 1);
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body1" sx={{}}>
                    {quantityProduct}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setQuantityProduct((prev) => prev + 1);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Button
                  onClick={() => {
                    user
                      ? handleAddToCart({
                          product_id: product.id,
                          product_name: product.name,
                          product_image: product.image,
                          product_priceCents: product.price_cents,
                          quantity: quantityProduct,
                        })
                      : navigate("/login");
                  }}
                  fullWidth
                  sx={{
                    mt: "auto",
                    height: "56px",
                    backgroundColor: "orange",
                    color: "white",
                    "&:hover": { bgcolor: "#e67e00" },
                    borderRadius: 1,
                  }}
                >
                  Adicionar <ShoppingCartOutlinedIcon />
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
