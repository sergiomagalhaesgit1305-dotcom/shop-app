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
                  display: "flex",
                  gap: 2,
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  "&::-webkit-scrollbar": { display: "none" },
                  scrollbarWidth: "none",
                }}
              >
                <Box
                  component="img"
                  src={Laptop}
                  alt={Laptop}
                  sx={{
                    minWidth: { xs: 150, sm: 220 },
                    height: 450,
                    objectFit: "cover",
                    scrollSnapAlign: "start",
                  }}
                />
                {products.slice(0, 8).map((product) => (
                  <Box
                    key={product.id}
                    sx={{
                      minWidth: { xs: 150, sm: 220 },
                      maxWidth: { xs: 150, sm: 220 },
                      height: 450,
                      scrollSnapAlign: "start",
                      display: "flex",
                      flexDirection: "column",
                      "& > div": {
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      },
                    }}
                  >
                    <ProductCardComponent key={product.id} product={product} />
                  </Box>
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
