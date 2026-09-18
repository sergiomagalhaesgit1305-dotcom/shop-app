import { createContext, useContext, useEffect, useState } from "react";
import type { TChildren } from "../types/TypeChildren";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export type User = {
  id: string;
  email: string;
  username?: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: TChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/me", {
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

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  }, [data]);

  const { mutate: UpdateUsername } = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:3000/me", {
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
    onSuccess: (data) => {
      setUser(data.username);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/me");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    UpdateUsername();
  };

  const { mutate: LogoutMutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setUser(null);
      navigate("/");
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
      value={{ user, setUser, handleUsernameChange, handleSubmit, logout }}
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
