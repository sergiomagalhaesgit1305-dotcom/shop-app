import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { useOrder } from "../../context/OrderContext";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useAuth } from "../../context/AuthContext";
import { FormatedPrice } from "../../utils/FormatPrice";

export const OrderHistoryPage = () => {
  const { order } = useOrder();
  const { user } = useAuth();

  const hasOrders = order && order.length > 0;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-PT");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {user?.username}
        </Typography>

        <Box sx={{ borderLeft: "4px solid #ff5722", pl: 1 }}>
          <Typography variant="h5">Encomendas</Typography>
        </Box>
      </Box>
      {!hasOrders ? (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography color="text.secondary">
            Nenhuma encomenda encontrada.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {order.map((singleOrder) => (
            <Accordion key={singleOrder.id}>
              <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "space-between",
                    width: "100%",
                    pr: 2,
                  }}
                >
                  <Typography>Encomenda: {singleOrder.id}</Typography>
                  <Typography>
                    Data: {formatDate(singleOrder.created_at)}
                  </Typography>
                  <Typography>
                    Total: {FormatedPrice(singleOrder.total_cents)}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {singleOrder.order_items.map((product) => (
                    <Box
                      key={product.id}
                      sx={{
                        width: "100%",
                        display: "flex",
                        gap: 2,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", gap: 2, alignItems: "center" }}
                      >
                        {product.product_image && (
                          <Box
                            component="img"
                            src={product.product_image}
                            alt={product.product_name}
                            sx={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                              borderRadius: 1,
                            }}
                          />
                        )}
                        <Typography>{product.product_name}</Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", gap: 2, alignItems: "center" }}
                      >
                        <Typography color="text.secondary">
                          Qtd: {product.quantity}
                        </Typography>
                        <Typography sx={{ fontWeight: "medium" }}>
                          {FormatedPrice(product.product_priceCents)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Box>
  );
};
