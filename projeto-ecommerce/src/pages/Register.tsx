import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormBox } from "../components/FormBox";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import { API_URL } from "../API_URL";

export const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          <FormBox onSubmit={handleSubmit}>
            <CardContent>
              <TextField
                sx={{ marginBottom: 2 }}
                type="email"
                value={email}
                onChange={handleEmailChange}
                label="Email"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                sx={{ marginBottom: 2 }}
                type="text"
                value={username}
                onChange={handleUsernameChange}
                label="Username"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                sx={{ marginBottom: 2 }}
                type="password"
                value={password}
                onChange={handlePasswordChange}
                label="Password"
                variant="outlined"
                fullWidth
                required
              />
              <CardActions>
                <Button type="submit">Cadastrar-se</Button>
              </CardActions>
            </CardContent>
          </FormBox>
        </Card>
      </Box>
      <Link to="/">Voltar</Link>
    </>
  );
};
