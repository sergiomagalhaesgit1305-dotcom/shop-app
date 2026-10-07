import { createContext, useContext, useEffect, useState } from "react";
import type { TChildren } from "../types/TypeChildren";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../API_URL";
import { enqueueSnackbar } from "notistack";
import type { TypeAuthContext, User } from "../types/TypeUser";

const AuthContext = createContext<TypeAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: TChildren) => {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user = null } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      return data.user;
    },
  });

  const isAdmin = user?.role === "admin";

  const { mutate: UpdateUsername } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update username");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      enqueueSnackbar("Quantidade atualizada!", {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });

      navigate("/me");
    },

    onError: () => {
      enqueueSnackbar("Nao foi possivel atualizar o nome de utilizador!", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    UpdateUsername();
  };

  const { mutate: LogoutMutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      navigate("/login");
    },
    onError: () => {
      enqueueSnackbar("Nao foi possivel terminar sessao do utilizador!", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
  });

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const logout = () => {
    LogoutMutate();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        handleUsernameChange,
        handleSubmit,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
