import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Carrosel } from "../components/Carrosel";
import { Category } from "../components/Category";
import { useProduct } from "../context/ProductsContext";
import Laptop from "../assets/LaptopImageForHome.jpg";
import { FormatedPrice } from "../utils/FormatPrice";
import { ProductCardComponent } from "../components/ProductCardComponent";

export const Home = () => {
  const { products } = useProduct();
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%", maxWidth: 1560, mx: "auto" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Carrosel />
        <Category />
        <Card sx={{ bgcolor: "background.paper" }}>
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
                  <ProductCardComponent key={product.id} product={product} />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
