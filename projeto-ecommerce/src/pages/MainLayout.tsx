import { Outlet } from "react-router-dom";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import { Box } from "@mui/material";

export const MainLayout = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <PrimarySearchAppBar />
      <Outlet />
    </Box>
  );
};
