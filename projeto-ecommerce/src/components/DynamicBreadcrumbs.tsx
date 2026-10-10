import { Breadcrumbs, Link as MuiLink, Typography, Box } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

export const DynamicBreadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <Box
      sx={{ width: "100%", mx: "auto", maxWidth: 1560, px: { xs: 2, md: 2 } }}
    >
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
          const displayName = value;

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
    </Box>
  );
};
