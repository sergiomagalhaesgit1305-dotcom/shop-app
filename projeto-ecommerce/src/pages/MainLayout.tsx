import { Outlet } from "react-router-dom";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import { Box } from "@mui/material";

export const MainLayout = () => {
  return (
    <Box>
      <PrimarySearchAppBar />
      <Outlet />
    </Box>
  );
};
