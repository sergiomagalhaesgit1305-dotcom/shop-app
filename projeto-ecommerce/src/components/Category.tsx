import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Acessorios from "../assets/Images/Acessorios.jpg";
import Calcado from "../assets/Images/Calcado.jpg";
import Camaras from "../assets/Images/Camaras.jpg";
import Computadores from "../assets/Images/Computadores.jpg";
import Desporto from "../assets/Images/Desporto.jpg";
import Fitness from "../assets/Images/Fitness.jpg";
import HeadPhones from "../assets/Images/headphones.jpeg";
import Roupa from "../assets/Images/Roupa.jpg";
import { useFilter } from "../context/FilterContext";

const category = [
  {
    id: 1,
    selectedSubcategory: "Computers",
    name: "Computadores",
    image: Computadores,
  },
  { id: 2, selectedSubcategory: "Audio", name: "Audio", image: HeadPhones },
  { id: 3, selectedSubcategory: "Cameras", name: "Câmaras", image: Camaras },
  {
    id: 4,
    selectedSubcategory: "Accessories",
    name: "Acessórios",
    image: Acessorios,
  },
  {
    id: 5,
    selectedSubcategory: "Fitness Equipment",
    name: "Fitness",
    image: Fitness,
  },
  {
    id: 6,
    selectedSubcategory: "Men's Clothing",
    name: "Roupa Masculina",
    image: Roupa,
  },
  {
    id: 7,
    selectedSubcategory: "Sports Gear & Accessories",
    name: "Desporto",
    image: Desporto,
  },
  { id: 8, selectedSubcategory: "Footwear", name: "Calçado", image: Calcado },
];

export const Category = () => {
  const { selectSubcategory } = useFilter();

  return (
    <Box>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            gap: 10,
            px: 5,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {category.map((item) => (
            <Button
              key={item.id}
              onClick={() => selectSubcategory(item.selectedSubcategory)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textTransform: "none",
                scrollSnapAlign: "center",
              }}
            >
              <Avatar
                src={item.image}
                alt={item.name}
                sx={{
                  width: { xs: 90, md: 100 },
                  height: { xs: 90, md: 100 },
                  mb: 1,
                  border: "2px solid gray",
                  transition:
                    "transform 0.3s ease-in-out, border-color 0.3s ease-in-out",
                  "&:hover": {
                    border: "2px solid #e67e00",
                    transform: "scale(1.08)",
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                {item.name}
              </Typography>
            </Button>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};
