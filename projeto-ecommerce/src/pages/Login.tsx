import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { FormBox } from "../components/FormBox";

export const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      navigate("/");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    <Alert severity="success">This is a success Alert.</Alert>;
    mutate();
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          p: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: 440,
            width: "100%",
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}
        >
          <FormBox onSubmit={handleSubmit}>
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  fontWeight: 800,
                  textAlign: "center",
                  mb: 3,
                  color: "inherit",
                }}
              >
                Entra na tua conta!
              </Typography>
              <TextField
                sx={{ marginBottom: 2 }}
                required
                type="email"
                value={email}
                onChange={handleEmailChange}
                label="Email"
                variant="outlined"
                fullWidth
              />
              <TextField
                sx={{ marginBottom: 2 }}
                required
                type="password"
                value={password}
                onChange={handlePasswordChange}
                label="Password"
                variant="outlined"
                fullWidth
              />
              <Button
                type="submit"
                fullWidth
                sx={{
                  height: "56px",
                  backgroundColor: "orange",
                  color: "white",
                  "&:hover": { bgcolor: "#e67e00" },
                  borderRadius: 1,
                }}
              >
                Inciar sessao
              </Button>
            </CardContent>
          </FormBox>
        </Card>
      </Box>

      <Link to="/">Voltar</Link>
    </>
  );
};
