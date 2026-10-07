import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../API_URL";
import { createContext } from "react";
import { useContext } from "react";
import type { TChildren } from "../types/TypeChildren";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import type {
  TCreateOrderItem,
  TOrder,
  TOrderContext,
} from "../types/TypeOrder";

const OrderContext = createContext<TOrderContext | undefined>(undefined);

export const OrderProvider = ({ children }: TChildren) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: order = null } = useQuery<TOrder[] | null>({
    queryKey: ["order"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/order`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      return await response.json();
    },
  });

  const { mutate: FinalizePurchase } = useMutation({
    mutationFn: async (order: TCreateOrderItem[]) => {
      const response = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to finalize pursache");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      enqueueSnackbar("Compra finalizada com sucesso!", {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
      navigate("/");
    },
    onError: () => {
      enqueueSnackbar("Nao foi possivel finalizar a compra", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
  });

  return (
    <OrderContext.Provider value={{ order, FinalizePurchase }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder deve ser usado dentro de um OrderProvider");
  }
  return context;
};
