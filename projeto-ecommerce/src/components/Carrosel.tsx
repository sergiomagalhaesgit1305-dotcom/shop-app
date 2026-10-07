import { useState } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Laptop from "../assets/Laptop.jpg";
import Camera from "../assets/Camera.jpg";
import { Box, Button } from "@mui/material";

const images = [Laptop, Camera];

export const Carrosel = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const showNextImage = () => {
    setImageIndex((prevIndex) => {
      if (prevIndex === images.length - 1) return 0;
      return prevIndex + 1;
    });
  };

  const showPrevImage = () => {
    setImageIndex((prevIndex) => {
      if (prevIndex === 0) return images.length - 1;
      return prevIndex - 1;
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        component="img"
        src={images[imageIndex]}
        alt={`Imagem ${imageIndex + 1}`}
        sx={{
          width: "100%",
          height: {
            xs: 200,
            sm: 280,
            md: 320,
          },
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />

      <Button
        sx={{
          position: "absolute",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
        }}
        onClick={showPrevImage}
      >
        <ArrowBackIosNewOutlinedIcon />
      </Button>
      <Button
        sx={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
        }}
        onClick={showNextImage}
      >
        <ArrowForwardIosOutlinedIcon />
      </Button>
    </Box>
  );
};
