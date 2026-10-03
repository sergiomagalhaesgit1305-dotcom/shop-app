import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  Radio,
  RadioGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormatedPrice } from "../utils/FormatPrice";
import { useCart } from "../context/CartContext";
import { CartProductQuantity } from "../components/ProductQuantity";
import { useAddress } from "../context/AddressContext";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useOrder } from "../context/OrderContext";

export const ShipProductPage = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const { FinalizePursache } = useOrder();

  const { address, DeleteAddress } = useAddress();

  return (
    <Box>
      <AppBar position="static" color="default">
        <Toolbar
          disableGutters
          sx={{ width: "100%", maxWidth: 1560, mx: "auto" }}
        >
          <Typography>MUI</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: "100%", mx: "auto", maxWidth: 1560, px: { md: 2 } }}>
        <Box>
          <Box sx={{ width: "100%", maxWidth: 1560, mx: "auto", mt: 4 }}>
            <Box
              sx={{
                flex: 4,
                display: "flex",
                gap: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 3,
                  gap: 2,
                }}
              >
                <Typography>Entrega</Typography>

                <Card>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      borderRadius: 1,
                    }}
                  >
                    <Typography>Morada</Typography>
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
                  </CardContent>
                </Card>

                <Typography>Envio</Typography>
                <Card>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      borderRadius: 1,
                    }}
                  >
                    <FormControl fullWidth>
                      <RadioGroup sx={{ gap: 2 }}>
                        <Box
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
                                <Typography>Envio Gratis</Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 1,
                                  }}
                                >
                                  <Typography>
                                    Envio por CTT Expresso ou Ontime, consoante
                                    tipo e volume de encomenda
                                  </Typography>
                                </Box>
                              </Box>
                            }
                          />
                        </Box>
                      </RadioGroup>
                    </FormControl>
                  </CardContent>
                </Card>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={() => FinalizePursache(cart)}
                    sx={{
                      height: "56px",
                      backgroundColor: "orange",
                      color: "white",
                      "&:hover": { bgcolor: "#e67e00" },
                      borderRadius: 1,
                    }}
                  >
                    Finalizar Compra
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <Card>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontSize: 20 }}>
                      Resumo dos Pedidos
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <CartProductQuantity />
                        Produtos
                      </Box>
                      <Typography>
                        {FormatedPrice(
                          cart.reduce(
                            (acc, item) =>
                              acc + item.product_priceCents * item.quantity,
                            0,
                          ),
                        )}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Iva</Typography>
                      <Typography>
                        {FormatedPrice(
                          cart.reduce(
                            (acc, item) =>
                              acc + item.product_priceCents * item.quantity,
                            0,
                          ) * 0.23,
                        )}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Envio gratis</Typography>
                      <Typography>0,00 €</Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>TOTAL</Typography>
                      <Typography>
                        {FormatedPrice(
                          cart.reduce(
                            (acc, item) =>
                              acc + item.product_priceCents * item.quantity,
                            0,
                          ),
                        )}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>

                <Accordion>
                  <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                    <Typography variant="h6" component="span">
                      Detalhes do Pedido
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {cart.map((item) => (
                      <Box
                        key={item.product_id}
                        sx={{
                          display: "flex",
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Box
                          component="img"
                          src={item.product_image}
                          alt={item.product_name}
                          sx={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                            borderRadius: 1,
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              lineHeight: 1.2,
                              mb: 2,
                            }}
                          >
                            {item.product_name}
                          </Typography>
                          <Typography color="text.secondary">
                            Quantidade: {item.quantity}
                          </Typography>
                          <Typography sx={{ mt: 1, fontWeight: "bold" }}>
                            {FormatedPrice(item.product_priceCents)}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
