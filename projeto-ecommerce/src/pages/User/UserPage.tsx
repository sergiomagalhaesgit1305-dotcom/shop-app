import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link, Outlet } from "react-router-dom";
import { ProfileTitle } from "../../components/ProfileTitle";
import { useIsMobile } from "../../components/useIsMobile";

export const UserPage = () => {
  const isMobile = useIsMobile();
  return (
    <Box
      sx={{ width: "100%", mx: "auto", maxWidth: 1560, px: { xs: 2, md: 2 } }}
    >
      {isMobile && <ProfileTitle />}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          mt: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ flex: 1, gap: 2, maxWidth: { xs: "100%", md: 400 } }}>
          <Card sx={{ mt: { xs: 0, md: 9.5 } }}>
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  component={Link}
                  to="/profile/encomendas"
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
