import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Radio,
  RadioGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { FormatedPrice } from "../utils/FormatPrice";
import { useCart } from "../context/CartContext";

export const ShipProductPage = () => {
  const { cart } = useCart();
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" color="default">
        <Toolbar
          disableGutters
          sx={{
            width: "80%",
            mx: "auto",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ bgcolor: "green", width: "100%" }}
          >
            MUI
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ bgcolor: "blue", width: "100%" }}
            >
              MUI
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ bgcolor: "blue", width: "100%" }}
            >
              MUI
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ bgcolor: "blue", width: "100%" }}
            >
              MUI
            </Typography>
          </Box>
          <Divider />
        </Toolbar>
      </AppBar>
      <Box sx={{ width: "80%", mx: "auto", mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Box
            sx={{ flex: 3, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: "flex" }}>
                  <Button sx={{ width: "50%" }}>a</Button>
                  <Button sx={{ width: "50%" }}>a</Button>
                </Box>
                <RadioGroup name="use-radio-group" defaultValue="first">
                  <FormControlLabel
                    value="first"
                    label="First"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="second"
                    label="Second"
                    control={<Radio />}
                  />
                </RadioGroup>
              </CardContent>
            </Card>
            <Card>
              <CardContent></CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
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
                }}
              >
                <Typography>Resumo dos Pedidos</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box
                    sx={{
                      bgcolor: "blue",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>
                      {cart.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                      Produtos
                    </Typography>
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
                      bgcolor: "blue",
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
                      bgcolor: "blue",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>Total</Typography>
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
                </Box>
              </CardContent>
            </Card>

            <Accordion>
              <AccordionSummary expandIcon={<KeyboardArrowUpOutlinedIcon />}>
                <Typography component="span">Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
