import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { useOrder } from "../../context/OrderContext";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FormatedPrice } from "../../utils/FormatPrice";
import { ProfileTitle } from "../../components/ProfileTitle";
import { useIsMobile } from "../../components/useIsMobile";

export const OrderHistoryPage = () => {
  const { order } = useOrder();
  const isMobile = useIsMobile();

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
      {!isMobile && <ProfileTitle />}
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
