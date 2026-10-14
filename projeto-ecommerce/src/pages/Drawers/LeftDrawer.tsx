import {
  Box,
  Button,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { TDrawer } from "../../types/TypeDrawer";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import MedicationLiquidOutlinedIcon from "@mui/icons-material/MedicationLiquidOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import CameraFrontOutlinedIcon from "@mui/icons-material/CameraFrontOutlined";
import { useFilter } from "../../context/FilterContext";

const Category = [
  {
    id: 1,
    category: "Electronics & Gadgets",
    name: "Computadores",
    icon: <ComputerOutlinedIcon />,
  },
  {
    id: 2,
    category: "Health & Fitness",
    name: "Audio",
    icon: <MedicationLiquidOutlinedIcon />,
  },
  {
    id: 3,
    category: "Fashion & Apparel",
    name: "Câmaras",
    icon: <DiamondOutlinedIcon />,
  },
  {
    id: 4,
    category: "Home & Kitchen",
    name: "Acessórios",
    icon: <HomeOutlinedIcon />,
  },
  {
    id: 5,
    category: "Health & Fitness",
    name: "Fitness",
    icon: <FitnessCenterOutlinedIcon />,
  },
  {
    id: 6,
    category: "Beauty & Personal Care",
    name: "Roupa Masculina",
    icon: <CameraFrontOutlinedIcon />,
  },
];

export const LeftDrawer = ({ open, onClose }: TDrawer) => {
  const { selectCategory } = useFilter();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerAnchor = isMobile ? "bottom" : "left";

  return (
    <Drawer
      anchor={drawerAnchor}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: isMobile
            ? {
                height: "80vh",
                maxHeight: "80vh",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                width: "100%",
                m: 0,
              }
            : {
                m: 2,
                height: "calc(100% - 32px)",
                borderRadius: 3,
                width: 460,
              },
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <IconButton onClick={onClose}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            m: 1.5,
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {Category.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => {
                    selectCategory(item.category);
                    onClose();
                  }}
                  variant="outlined"
                  color="inherit"
                  sx={{
                    border: "none",
                    color: "text.primary",
                    justifyContent: "left",
                    gap: 1,
                  }}
                >
                  {item.icon}
                  <Typography>{item.name}</Typography>
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};
