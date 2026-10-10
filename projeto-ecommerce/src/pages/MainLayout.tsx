import { Outlet } from "react-router-dom";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import { Box } from "@mui/material";
import { DynamicBreadcrumbs } from "../components/DynamicBreadcrumbs";

export const MainLayout = () => {
  return (
    <Box>
      <PrimarySearchAppBar />
      <DynamicBreadcrumbs />
      <Outlet />
    </Box>
  );
};
