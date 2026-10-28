import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProfileTitle = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname.includes("dados")) return "Dados Pessoais";
    if (location.pathname.includes("favoritos")) return "Favoritos";
    if (location.pathname.includes("encomendas")) return "Encomendas";
    return "";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {user?.username}
      </Typography>

      <Box sx={{ borderLeft: "4px solid #ff5722", pl: 1 }}>
        <Typography variant="h5">{getPageTitle()}</Typography>
      </Box>
    </Box>
  );
};
