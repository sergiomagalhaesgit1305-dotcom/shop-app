import {
  Box,
  Button,
  Card,
  CardContent,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { FormBox } from "../../components/FormBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../context/AuthContext";
import { useAddress } from "../../context/AddressContext";
import { useUpdatePassword } from "../../components/ChangePassword";
import { useState } from "react";

export const PersonalDetails = () => {
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
    DeleteAddress,
  } = useAddress();

  const {
    userPassword,
    newPassword,
    confirmNewPassword,
    handleUserPasswordChange,
    handleNewPasswordChange,
    handleConfirmNewPasswordChange,
    handleNewPasswordSubmit,
  } = useUpdatePassword();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          maxWidth: 1560,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {user?.username}
        </Typography>

        <Box sx={{ borderLeft: "4px solid #ff5722", pl: 1 }}>
          <Typography variant="h5">Dados Pessoais</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
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
              label="Nome"
              value={user?.username || ""}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <TextField
              id="outlined-read-only-input"
              label="Email"
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
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: 1,
            }}
          >
            <FormBox onSubmit={handleNewPasswordSubmit}>
              <Typography>Alterar Password</Typography>
              <TextField
                type="password"
                label="Password Atual"
                value={userPassword}
                onChange={handleUserPasswordChange}
              />
              <TextField
                type="password"
                label="Nova Password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              <TextField
                type="password"
                label="Confirmar Nova Password"
                value={confirmNewPassword}
                onChange={handleConfirmNewPasswordChange}
              />
              <Button
                type="submit"
                fullWidth
                sx={{
                  width: "30%",
                  backgroundColor: "orange",
                  color: "white",
                  "&:hover": { bgcolor: "#e67e00" },
                  borderRadius: 1,
                  mx: "auto",
                }}
              >
                Guardar
              </Button>
            </FormBox>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography>Moradas de entrega</Typography>
              <FormControl fullWidth>
                <RadioGroup sx={{ gap: 2 }}>
                  {address.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
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
                              <Typography>Nome: {user?.username}</Typography>
                              <Typography>Morada: {item.street}</Typography>
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
                              <Typography>Telefone: {item.phone}</Typography>
                            </Box>
                          </Box>
                        }
                      />
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          edge="end"
                          aria-haspopup="true"
                          onClick={() => DeleteAddress(item.id)}
                          color="inherit"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          edge="end"
                          aria-haspopup="true"
                          onClick={() => DeleteAddress(item.id)}
                          color="inherit"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
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
                    <Typography variant="h6">Conteúdo Centralizado</Typography>
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
    </>
  );
};
