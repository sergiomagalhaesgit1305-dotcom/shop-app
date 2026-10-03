import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useState } from "react";
import { PersonalDetails } from "./PersonalDetails";
import { FavoritesPage } from "./FavoritesPage";
import { Link, Outlet } from "react-router-dom";

type TValueButton = "Encomendas" | "Dados" | "Favoritos" | "Avaliacao";

export const UserPage = () => {
  const [selectedButton, setSelectedButton] =
    useState<TValueButton>("Encomendas");

  return (
    <Box sx={{ width: "100%", mx: "auto", maxWidth: 1560, px: { md: 2 } }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 3, mt: 4 }}>
        <Box sx={{ flex: 1, gap: 2, maxWidth: 400 }}>
          <Card sx={{ mt: 9.5 }}>
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  component={Link}
                  to="/me/encomendas"
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
                  to="/me/dados"
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
                  to="/me/favoritos"
                  variant="outlined"
                  color="inherit"
                  sx={{ justifyContent: "left", p: 2, gap: 1 }}
                >
                  <PersonOutlineOutlinedIcon />
                  <Typography>Favoritos</Typography>
                </Button>
                <Button
                  onClick={() => setSelectedButton("Avaliacao")}
                  variant="outlined"
                  color="inherit"
                  sx={{ justifyContent: "left", p: 2, gap: 1 }}
                >
                  <PersonOutlineOutlinedIcon />
                  <Typography>Avaliação de produtos</Typography>
                </Button>

                <Button sx={{ justifyContent: "center", p: 2, gap: 1 }}>
                  <Typography>Terminar sessão</Typography>
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
