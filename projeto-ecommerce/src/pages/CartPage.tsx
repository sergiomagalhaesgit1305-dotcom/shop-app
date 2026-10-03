import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { FormatedPrice } from "../utils/FormatPrice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link } from "react-router-dom";

export const CartPage = () => {
  const theme = useTheme();
  const { cart, handleRemoveItem, handleDecreaseItem, handleAddItem } =
    useCart();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 1560,
            mx: "auto",
            gap: 4,
            px: { md: 3 },
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, mt: 2 }} color="text.secondary">
            Carrinho de Compras
          </Typography>
          <Typography>
            Total ({cart.reduce((acc, item) => acc + item.quantity, 0)} Item){" "}
            {FormatedPrice(
              cart.reduce(
                (acc, item) => acc + item.product_priceCents * item.quantity,
                0,
              ),
            )}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              bgcolor: "background.default",
              color: "text.primary",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box
              sx={{
                flex: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                  {!isMobile && (
                    <>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 3fr 1fr 1fr 1fr",
                        }}
                      >
                        <Typography variant="h6">Artigo</Typography>
                        <Typography variant="h6">Descrição</Typography>
                        <Typography variant="h6">Preço</Typography>
                        <Typography variant="h6">Quantidade</Typography>
                        <Typography variant="h6">Total</Typography>
                      </Box>
                      <Divider sx={{ mb: 1 }} />{" "}
                    </>
                  )}
                  {cart.length === 0 && (
                    <Typography
                      color="text.secondary"
                      sx={{
                        textAlign: "center",
                        py: 8,
                      }}
                    >
                      Ainda não tens produtos no carrinho.
                    </Typography>
                  )}
                  {cart.map((item) => (
                    <Box key={item.product_id}>
                      {isMobile ? (
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            py: 2,
                            position: "relative",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box
                            component="img"
                            src={item.product_image}
                            alt={item.product_name}
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 2,
                              objectFit: "cover",
                              flexShrink: 0,
                            }}
                          />

                          <Box
                            sx={{
                              flex: 1,
                              gap: 1,
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                color: "text.primary",
                                lineHeight: 1.3,
                                mb: 1,
                              }}
                            >
                              {item.product_name}
                            </Typography>
                            <Typography>
                              {FormatedPrice(item.product_priceCents)}
                            </Typography>
                            <Card
                              variant="outlined"
                              sx={{
                                width: "50%",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  m: 0.5,
                                }}
                              >
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    handleDecreaseItem(item.product_id);
                                  }}
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography variant="body1" sx={{}}>
                                  {item.quantity}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    handleAddItem(item.product_id);
                                  }}
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </Card>
                          </Box>

                          <IconButton
                            size="small"
                            onClick={() => {
                              handleRemoveItem(item.product_id);
                            }}
                          >
                            <CloseOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: { xs: "none", sm: "grid" },
                            gridTemplateColumns: "1fr 3fr 1fr 1fr 1fr",
                            alignItems: "center",
                            py: 2,
                          }}
                        >
                          <Box
                            component="img"
                            src={item.product_image}
                            alt={item.product_name}
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 2,
                              objectFit: "cover",
                            }}
                          />
                          <Typography variant="h6">
                            {item.product_name}
                          </Typography>
                          <Typography>
                            {FormatedPrice(item.product_priceCents)}
                          </Typography>
                          <Card
                            variant="outlined"
                            sx={{
                              width: "70%",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                m: 0.5,
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={() => {
                                  handleDecreaseItem(item.product_id);
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <Typography variant="body1" sx={{}}>
                                {item.quantity}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => {
                                  handleAddItem(item.product_id);
                                }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Card>
                          <Typography>
                            {FormatedPrice(
                              item.product_priceCents * item.quantity,
                            )}
                          </Typography>
                        </Box>
                      )}
                      <Divider sx={{ mt: 2 }} />
                    </Box>
                  ))}
                </CardContent>
              </Card>
              {cart.length > 0 && (
                <Card sx={{ borderRadius: 2, mt: 2 }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button component={Link} to="/">
                      Continuar a comprar
                    </Button>

                    <Button>Limpar carrinho</Button>
                  </CardContent>
                </Card>
              )}
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
                    <Box>Produtos</Box>
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
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
