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

  if (!order || order?.length === 0) {
    return <Typography>Nenhuma encomenda encontrada</Typography>;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-PT");
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {user?.username}
        </Typography>

        <Box sx={{ borderLeft: "4px solid #ff5722", pl: 1 }}>
          <Typography variant="h5">Encomendas</Typography>
        </Box>
      </Box>
      {order.map((order) => (
        <Accordion key={order.id}>
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
              <Typography>Encomenda: {order.id}</Typography>
              <Typography>Data: {formatDate(order.created_at)}</Typography>
              <Typography>Total: {FormatedPrice(order.total_cents)}</Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {order.order_items.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    width: "100%",
                    display: "flex",
                    gap: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
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

                  <Box sx={{ display: "flex", gap: 2 }}>
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
    </>
  );
};
