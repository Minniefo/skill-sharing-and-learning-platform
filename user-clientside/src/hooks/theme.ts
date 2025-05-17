// theme.ts
import { createTheme, type Theme } from "@mui/material/styles";

export const lightColors = {
  primary: "#4361ee",
  secondary: "#3f37c9",
  success: "#4cc9f0",
  warning: "#f8961e",
  error: "#f72585",
  info: "#4895ef",
  dark: "#3a0ca3",
  light: "#f8f9fa",
};

export const darkColors = {
  primary: "#4895ef",
  secondary: "#4361ee",
  success: "#4cc9f0",
  warning: "#f8961e",
  error: "#f72585",
  info: "#3f37c9",
  dark: "#3a0ca3",
  light: "#121212",
};

export const getTheme = (darkMode: boolean): Theme =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? darkColors.primary : lightColors.primary },
      secondary: {
        main: darkMode ? darkColors.secondary : lightColors.secondary,
      },
      success: { main: darkMode ? darkColors.success : lightColors.success },
      warning: { main: darkMode ? darkColors.warning : lightColors.warning },
      error: { main: darkMode ? darkColors.error : lightColors.error },
      info: { main: darkMode ? darkColors.info : lightColors.info },
      background: {
        default: darkMode ? darkColors.light : lightColors.light,
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });