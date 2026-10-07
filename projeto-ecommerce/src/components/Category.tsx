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
    name: "Desporto & Acessórios",
    image: Desporto,
  },
  { id: 8, selectedSubcategory: "Footwear", name: "Calçado", image: Calcado },
];

export const Category = () => {
  const { selectSubcategory, selectedSubcategory } = useFilter();

  return (
    <Box>
      <Card>
        <CardContent
          sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
        >
          {category.map((item) => {
            const isSelected = selectedSubcategory === item.selectedSubcategory;

            return (
              <Button
                key={item.id}
                onClick={() => selectSubcategory(item.selectedSubcategory)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textTransform: "none",
                }}
              >
                <Avatar
                  src={item.image}
                  alt={item.name}
                  sx={{ width: 100, height: 100, mb: 1 }}
                />
                <Typography variant="body2" color="text.primary">
                  {item.name}
                </Typography>
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
};
