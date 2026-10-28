import { Breadcrumbs, Link as MuiLink, Typography, Box } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useProduct } from "../context/ProductsContext";
import { useIsMobile } from "./useIsMobile";

export const DynamicBreadcrumbs = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { products } = useProduct();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <Box
      sx={{ width: "100%", mx: "auto", maxWidth: 1560, px: { xs: 2, md: 2 } }}
    >
      {!isMobile && (
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink
            component={RouterLink}
            underline="hover"
            color="inherit"
            to="/"
          >
            Home
          </MuiLink>

          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;

            let displayName = value;

            if (!isNaN(Number(value))) {
              const foundProduct = products.find(
                (p: any) => p.id === Number(value),
              );
              if (foundProduct) displayName = foundProduct.name;
            } else {
              displayName = value
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());
            }

            return last ? (
              <Typography color="text.primary" key={to}>
                {displayName}
              </Typography>
            ) : (
              <MuiLink
                component={RouterLink}
                underline="hover"
                color="inherit"
                to={to}
                key={to}
              >
                {displayName}
              </MuiLink>
            );
          })}
        </Breadcrumbs>
      )}
    </Box>
  );
};
