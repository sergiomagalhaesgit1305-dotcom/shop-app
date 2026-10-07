import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Carrosel } from "../components/Carrosel";
import { Category } from "../components/Category";
import { useProduct } from "../context/ProductsContext";
import Laptop from "../assets/LaptopImageForHome.jpg";
import { FormatedPrice } from "../utils/FormatPrice";

export const Home = () => {
  const { products } = useProduct();
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%", maxWidth: 1560, mx: "auto" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Carrosel />
        <Category />
        <Card>
          <CardContent sx={{ m: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h4">Destaques</Typography>
                <Button onClick={() => navigate("/products")}>Ver Mais</Button>
              </Box>
              <Box
                sx={{
                  height: 500,
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: 2,
                  alignItems: "stretch",
                }}
              >
                <Box
                  component="img"
                  src={Laptop}
                  alt={Laptop}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
                {products.slice(0, 4).map((product) => (
                  <Card key={product.id}>
                    <CardContent
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        bgcolor: "background.default",
                      }}
                    >
                      <Box
                        onClick={() => navigate(`/product/${product.id}`)}
                        component="img"
                        src={`${product.image}?w=164&h=164&fit=crop&auto=format`}
                        alt={product.image}
                        sx={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                          borderRadius: 1,
                          cursor: "pointer",
                        }}
                      />
                      <Typography>{product.name}</Typography>
                      <Typography variant="body2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </Typography>
                      <Typography>
                        {FormatedPrice(product.price_cents)}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
