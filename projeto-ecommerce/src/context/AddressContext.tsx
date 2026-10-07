import { createContext, useContext, useState } from "react";
import type { TChildren } from "../types/TypeChildren";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../API_URL";
import { useAuth } from "./AuthContext";
import { enqueueSnackbar } from "notistack";
import type { TAddress, TAddressContext } from "../types/TypeAddress";

const addressContext = createContext<TAddressContext | undefined>(undefined);

export const AddressProvider = ({ children }: TChildren) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [street, setStreet] = useState<string>("");
  const [postal_code, setPostalCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value);
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");

    if (onlyNumbers.length <= 9) {
      setPhone(onlyNumbers);
    }
  };

  const { data } = useQuery<TAddress[]>({
    queryKey: ["address"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/address`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      return await response.json();
    },
  });

  const address = data || [];

  const { mutate: PostAddress } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/address`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ street, postal_code, city, phone }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      enqueueSnackbar("Morada adicionada com sucesso", {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
      setStreet("");
      setPostalCode("");
      setCity("");
      setPhone("");
    },

    onError: () => {
      enqueueSnackbar("Nao foi possivel adicionar a morada", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    PostAddress();
  };

  const { mutate: DeleteAddress } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_URL}/address/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });

  return (
    <addressContext.Provider
      value={{
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
      }}
    >
      {children}
    </addressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(addressContext);

  if (!context) {
    throw new Error("useAddress deve ser usado dentro de um AddressProvider");
  }

  return context;
};
