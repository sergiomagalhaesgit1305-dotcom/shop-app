import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  useColorScheme,
} from "@mui/material/styles";
import { createContext, useContext } from "react";
import type { TChildren } from "../types/TypeChildren";
import { CssBaseline } from "@mui/material";

export type Theme = "system" | "light" | "dark";

type TypeThemeContext = {
  mode: Theme;
  setMode: (mode: Theme) => void;
};

const ThemeContext = createContext<TypeThemeContext | undefined>(undefined);

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#f6f6f6",
          paper: "#ffffff",
        },
      },
    },
    dark: true,
  },
});

const ThemeContextWrapper = ({ children }: TChildren) => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        mode: mode as Theme,
        setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export const CustomThemeProvider = ({ children }: TChildren) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeContextWrapper>{children}</ThemeContextWrapper>
    </MuiThemeProvider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useAppTheme deve ser usado dentro de um CustomThemeProvider",
    );
  }
  return context;
};
