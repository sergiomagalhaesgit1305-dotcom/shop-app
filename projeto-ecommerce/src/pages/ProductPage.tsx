import { useNavigate } from "react-router-dom";
import { FormatedPrice } from "../utils/FormatPrice";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";

export const ProductPage = () => {
  const navigate = useNavigate();
  const { handleCart } = useCart();
  const { user } = useAuth();
  const { filteredProducts } = useSearch();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          p: 2,
          gap: 3,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 2fr))",
        }}
      >
        {filteredProducts.map((product) => (
          <Card
            sx={{ minWidth: "200px", borderRadius: "20px" }}
            key={product.id}
          >
            <CardContent>
              <img
                style={{ width: "100%", height: 225 }}
                src={product.image}
                alt={product.image}
                about={product.image}
              />
              <Typography sx={{ m: 3 }} color="text.secondary">
                {product.name}
              </Typography>
              <p>{FormatedPrice(product.priceCents)}</p>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              <button
                onClick={() => {
                  user
                    ? handleCart(
                        product.image,
                        product.name,
                        product.priceCents,
                        product.id,
                        1,
                      )
                    : navigate("/login");
                }}
              >
                Comprar
              </button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
