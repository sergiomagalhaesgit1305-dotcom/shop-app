import { styled, alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Switch } from "@mui/material";
import { useAppTheme } from "./ControlColors";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { CartDrawer } from "../pages/Drawers/CartDrawer";
import { useFilter } from "../context/FilterContext";
import { FavoriteDrawer } from "../pages/Drawers/FavoriteDrawer";
import { ProfileDrawer } from "../pages/Drawers/ProfileDrawer";
import { LeftDrawer } from "../pages/Drawers/LeftDrawer";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(
    theme.palette.text.primary,
    theme.palette.mode === "light" ? 0.15 : 0.25,
  ),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isFavoriteDrawerOpen, setIsFavoriteDrawerOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const { search, handleChange, handleKeyDown } = useFilter();
  const { mode, setMode } = useAppTheme();

  useEffect(() => {
    if (search.length === 0) {
      navigate("/");
    }
  }, [search]);

  const renderMenu = (
    <ProfileDrawer
      open={isProfileDrawerOpen}
      onClose={() => setIsProfileDrawerOpen(false)}
    />
  );

  const renderMobileMenu = (
    <ProfileDrawer
      open={isProfileDrawerOpen}
      onClose={() => setIsProfileDrawerOpen(false)}
    />
  );

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" color="default">
        <Toolbar sx={{ width: "100%", maxWidth: 1560, mx: "auto" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setIsLeftDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Search…"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={search}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <WbSunnyOutlinedIcon />
          <Switch
            checked={mode === "dark"}
            onChange={(event) =>
              setMode(event.target.checked ? "dark" : "light")
            }
          />
          <BedtimeOutlinedIcon />
          {user ? (
            <>
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                    gap: 1,
                    alignItems: "center",
                  },
                }}
              >
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="Favorites"
                  color="inherit"
                  onClick={() => setIsFavoriteDrawerOpen(true)}
                >
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={() => setIsProfileDrawerOpen(true)}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="Cart"
                  color="inherit"
                  onClick={() => setIsCartDrawerOpen(true)}
                >
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-haspopup="true"
                  onClick={() => setIsProfileDrawerOpen(true)}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <FavoriteDrawer
        open={isFavoriteDrawerOpen}
        onClose={() => setIsFavoriteDrawerOpen(false)}
      />
      <CartDrawer
        open={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
      />
      <LeftDrawer
        open={isLeftDrawerOpen}
        onClose={() => setIsLeftDrawerOpen(false)}
      />
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
