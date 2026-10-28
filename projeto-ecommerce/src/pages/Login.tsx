import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { API_URL } from "../API_URL";
import { enqueueSnackbar } from "notistack";

export const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.message || "Falha ao iniciar sessão";
        setErrorMessage(message);
        throw new Error(message);
      }

      return await response.json();
    },
    onSuccess: () => {
      setErrorMessage("");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      navigate("/");
      enqueueSnackbar("Sessão iniciada com sucesso.", {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
    onError: (error: Error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Box
      sx={{
        maxWidth: 1560,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        px: { xs: 4 },
        mt: { xs: 5, md: 5 },
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 5,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <CardContent
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: 2,
              }}
            >
              <Typography
                variant="h5"
                component="h1"
                sx={{ fontWeight: 800, textAlign: "center", mb: 3 }}
              >
                Entra na tua conta!
              </Typography>
              <TextField
                sx={{ mb: 2 }}
                required
                type="email"
                value={email}
                onChange={handleEmailChange}
                error={Boolean(errorMessage)}
                label="Email"
                variant="outlined"
                fullWidth
              />
              <TextField
                sx={{ mb: 2 }}
                required
                type="password"
                value={password}
                onChange={handlePasswordChange}
                error={Boolean(errorMessage)}
                helperText={errorMessage}
                label="Password"
                variant="outlined"
                fullWidth
              />
              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: "auto",
                  height: "56px",
                  backgroundColor: "orange",
                  color: "white",
                  "&:hover": { bgcolor: "#e67e00" },
                  borderRadius: 1,
                }}
              >
                Iniciar sessão
              </Button>
            </CardContent>
          </Box>
        </Card>
        <Card
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}
        >
          <CardContent
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              sx={{ fontWeight: 800, textAlign: "center", mb: 3 }}
            >
              Ainda não tens conta? Regista-te agora!
            </Typography>
            <Typography>Fácil e Rápido!</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 1,
                mb: 3,
              }}
            >
              <Typography variant="body2">
                • Acompanha os teus pedidos
              </Typography>
              <Typography variant="body2">
                • Guarda os teus detalhes de pagamento e de envio e poupa tempo
              </Typography>
              <Typography variant="body2">• Faz devoluções online</Typography>
            </Box>
            <Button
              component={Link}
              to="/register"
              fullWidth
              sx={{
                mt: "auto",
                height: "56px",
                backgroundColor: "orange",
                color: "white",
                "&:hover": { bgcolor: "#e67e00" },
                borderRadius: 1,
              }}
            >
              Criar Conta
            </Button>
          </CardContent>
        </Card>
      </Box>
      <Button component={Link} to="/">
        Voltar
      </Button>
    </Box>
  );
};
