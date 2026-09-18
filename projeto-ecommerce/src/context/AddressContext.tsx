import { createContext, useContext, useState } from "react";
import type { TChildren } from "../types/TypeChildren";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type TAddress = {
  id: string;
  street: string;
  postal_code: string;
  city: string;
  phone: string;
};

type TAddressContext = {
  address: TAddress[];
  street: string;
  postal_code: string;
  city: string;
  phone: string;
  handleStreetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePostalCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const addressContext = createContext<TAddressContext | undefined>(undefined);

export const AddressProvider = ({ children }: TChildren) => {
  const queryClient = useQueryClient();

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
      const response = await fetch("http://localhost:3000/address", {
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

  const address = data || [];

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:3000/address", {
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["address"] });

      setStreet("");
      setPostalCode("");
      setCity("");
      setPhone("");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate();
  };

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
