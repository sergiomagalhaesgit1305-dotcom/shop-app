import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useAuth } from "../../context/AuthContext";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import type { TDrawer } from "../../types/TypeDrawer";
import { Link } from "react-router-dom";

export const ProfileDrawer = ({ open, onClose }: TDrawer) => {
  const { user, logout } = useAuth();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerAnchor = isMobile ? "bottom" : "right";
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
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={onClose}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontSize: 25 }}>Olá {user?.username}</Typography>
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
              <Button
                component={Link}
                to="/profile/encomendas"
                onClick={onClose}
                variant="outlined"
                color="inherit"
                sx={{
                  color: "text.primary",
                  justifyContent: "left",
                  p: 2,
                  gap: 1,
                }}
              >
                <PersonOutlineOutlinedIcon />
                <Typography>As Minhas Encomendas</Typography>
              </Button>
              <Button
                component={Link}
                to="/profile/dados"
                onClick={onClose}
                variant="outlined"
                color="inherit"
                sx={{
                  color: "text.primary",
                  justifyContent: "left",
                  p: 2,
                  gap: 1,
                }}
              >
                <PersonOutlineOutlinedIcon />
                <Typography>Dados Pessoais</Typography>
              </Button>
              <Button
                component={Link}
                to="/profile/favoritos"
                onClick={onClose}
                variant="outlined"
                color="inherit"
                sx={{ justifyContent: "left", p: 2, gap: 1 }}
              >
                <PersonOutlineOutlinedIcon />
                <Typography>Favoritos</Typography>
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ justifyContent: "left", p: 2, gap: 1 }}
              >
                <PersonOutlineOutlinedIcon />
                <Typography>Avaliação de produtos</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box>
          <Button
            onClick={logout}
            sx={{ justifyContent: "center", p: 2, gap: 1 }}
          >
            <Typography>Terminar sessão</Typography>
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
