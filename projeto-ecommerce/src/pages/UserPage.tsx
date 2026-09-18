import {
  Box,
  Button,
  Card,
  CardContent,
  Drawer,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useState } from "react";
import { FormBox } from "../components/FormBox";
import { useAddress } from "../context/AddressContext";

export const UserPage = () => {
  const { user } = useAuth();
  const {
    address,
    street,
    postal_code,
    city,
    phone,
    handleStreetChange,
    handlePostalCodeChange,
    handleCityChange,
    handlePhoneChange,
    handleSubmit,
  } = useAddress();

  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "80%", mx: "auto", gap: 5 }}>
        <Typography>sadsad</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 5, mt: 5 }}>
          <Box sx={{ flex: 1, gap: 2, maxWidth: 400 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Button
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
                    sx={{ justifyContent: "left", p: 2, gap: 1, color: " " }}
                  >
                    <PersonOutlineOutlinedIcon />
                    <Typography>Avaliação de produtos</Typography>
                  </Button>

                  <Button
                    sx={{ justifyContent: "center", p: 2, gap: 1, color: " " }}
                  >
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
            <Box
              sx={{
                flex: 2,
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Card
                sx={{
                  flex: 1,
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    borderRadius: 1,
                  }}
                >
                  <Typography>Dados do utilizador</Typography>
                  <TextField
                    id="outlined-read-only-input"
                    label="Nome *"
                    value={user?.username || ""}
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                  <TextField
                    id="outlined-read-only-input"
                    label="Email *"
                    value={user?.email || ""}
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                </CardContent>
              </Card>
              <Card sx={{ flex: 1 }}>
                <CardContent>
                  <Typography>{user?.username}</Typography>
                  <h2>{user?.email}</h2>
                  <Link to="/">Voltar</Link>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Card sx={{ flex: 1 }}>
                <CardContent>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Typography>Moradas de entrega</Typography>
                    <FormControl fullWidth>
                      <RadioGroup sx={{ gap: 2 }}>
                        {address.map((item) => (
                          <Box
                            key={item.id}
                            sx={{
                              border: "1px solid",
                              borderColor: "divider",
                              borderRadius: 2,
                              p: 2,
                            }}
                          >
                            <FormControlLabel
                              value={item.id}
                              control={
                                <Radio
                                  sx={{
                                    color: "#ff5722",
                                    "&.Mui-checked": { color: "#ff5722" },
                                  }}
                                />
                              }
                              label={
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      gap: 2,
                                    }}
                                  >
                                    <Typography>
                                      Nome: {user?.username}
                                    </Typography>
                                    <Typography>
                                      Morada: {item.street}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      gap: 1,
                                    }}
                                  >
                                    <Typography>
                                      Codigo Postal: {item.postal_code}
                                    </Typography>
                                    <Typography>
                                      Telefone: {item.phone}
                                    </Typography>
                                  </Box>
                                </Box>
                              }
                            />
                          </Box>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <Box>
                      <Button variant="contained" onClick={() => setOpen(true)}>
                        Adicionar morada
                      </Button>

                      <Drawer
                        anchor="bottom"
                        open={open}
                        onClose={() => setOpen(false)}
                        slotProps={{
                          paper: {
                            sx: {
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%) !important",
                              width: { xs: "90%", sm: "500px" },
                              maxHeight: "80vh",
                              borderRadius: 2,
                              boxShadow: 24,
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: 3,
                            gap: 2,
                          }}
                        >
                          <Typography variant="h6">
                            Conteúdo Centralizado
                          </Typography>
                          <FormBox onSubmit={handleSubmit}>
                            <TextField
                              id="outlined-read-only-input"
                              label="Nome"
                              value={user?.username || ""}
                              slotProps={{
                                input: {
                                  readOnly: true,
                                },
                              }}
                              variant="outlined"
                              fullWidth
                            />
                            <TextField
                              required
                              type="text"
                              value={street}
                              onChange={handleStreetChange}
                              label="Morada"
                              variant="outlined"
                              fullWidth
                            />
                            <TextField
                              required
                              type="text"
                              value={postal_code}
                              onChange={handlePostalCodeChange}
                              label="Codigo Postal"
                              variant="outlined"
                              fullWidth
                            />
                            <TextField
                              required
                              type="text"
                              value={city}
                              onChange={handleCityChange}
                              label="Cidade"
                              variant="outlined"
                              fullWidth
                            />
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <TextField
                                label="Indicativo"
                                value="+351"
                                disabled
                                sx={{ width: "120px" }}
                              />
                              <TextField
                                required
                                type="tel"
                                value={phone}
                                onChange={handlePhoneChange}
                                label="Telefone"
                                variant="outlined"
                                fullWidth
                                slotProps={{
                                  htmlInput: {
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                  },
                                }}
                              />
                            </Box>

                            <Button
                              type="submit"
                              fullWidth
                              sx={{
                                height: "56px",
                                backgroundColor: "orange",
                                color: "white",
                                "&:hover": { bgcolor: "#e67e00" },
                                borderRadius: 1,
                              }}
                            >
                              Guardar
                            </Button>
                          </FormBox>
                        </Box>
                      </Drawer>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
