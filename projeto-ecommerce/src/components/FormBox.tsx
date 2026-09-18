import Box from "@mui/material/Box";
import type React from "react";

type TFormBoxProps = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const FormBox = ({ children, onSubmit }: TFormBoxProps) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
      noValidate
      autoComplete="off"
    >
      {children}
    </Box>
  );
};
