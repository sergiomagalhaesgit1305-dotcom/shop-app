import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Carrosel } from "../components/Carrosel";
import { Category } from "../components/Category";
import { useProduct } from "../context/ProductsContext";
import Laptop from "../assets/LaptopImageForHome.jpg";
import { ProductCardComponent } from "../components/ProductCardComponent";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useRef } from "react";

export const Home = () => {
  const { products } = useProduct();
  const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1560, mx: "auto" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Carrosel />
        <Category />
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent sx={{ m: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontSize: { xs: 25, sm: 35 } }}>
                  Destaques
                </Typography>
                <Button onClick={() => navigate("/products")}>Ver Mais</Button>
              </Box>
              <Box sx={{ position: "relative" }}>
                <Button
                  onClick={scrollLeft}
                  sx={{
                    display: { xs: "none", md: "flex" },
                    position: "absolute",
                    left: -20,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    minWidth: 40,
                    height: 40,
                    bgcolor: "background.paper",
                    boxShadow: 2,
                    borderRadius: "50%",
                    color: "text.primary",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ArrowBackIosNewOutlinedIcon fontSize="small" />
                </Button>
                <Box
                  ref={scrollRef}
                  sx={{
                    display: "flex",
                    gap: 2,
                    overflowX: "auto",
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                    py: 1,
                  }}
                >
                  <Box
                    sx={{
                      minWidth: { xs: 190, md: 250 },
                      height: 500,
                      scrollSnapAlign: "start",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 2,
                      overflow: "hidden",
                      position: "relative",
                      boxShadow: 1,
                    }}
                  >
                    <Box
                      component="img"
                      src={Laptop}
                      alt="Banner Destaque"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    />
                    <Box
                      sx={{
                        position: "relative",
                        zIndex: 1,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        height: "100%",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => navigate("/products")}
                        sx={{ mt: 1 }}
                      >
                        Ver Campanha
                      </Button>
                    </Box>
                  </Box>
                  {products.slice(0, 8).map((product) => (
                    <Box
                      key={product.id}
                      sx={{
                        minWidth: { xs: 190, md: 250 },
                        height: 500,
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
                      <ProductCardComponent product={product} />
                    </Box>
                  ))}
                </Box>
                <Button
                  onClick={scrollRight}
                  sx={{
                    display: { xs: "none", md: "flex" },
                    position: "absolute",
                    right: -20,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    minWidth: 40,
                    height: 40,
                    bgcolor: "background.paper",
                    boxShadow: 2,
                    borderRadius: "50%",
                    color: "text.primary",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ArrowForwardIosOutlinedIcon fontSize="small" />
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
