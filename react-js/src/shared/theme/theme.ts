import { alpha, createTheme } from "@mui/material";
import getColorObject from "./getColorObject";
import colors from "./colors";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: getColorObject(colors.blue100),
    secondary: getColorObject(colors.blue100),
    error: getColorObject(colors.error),
    warning: getColorObject(colors.warning),
    info: getColorObject(colors.information),
    success: getColorObject(colors.success),
    background: {
      default: colors.grey100,
      paper: colors.blackDark,
    },
    text: {
      primary: colors.white,
      secondary: alpha(colors.white, 0.7),
      disabled: alpha(colors.white, 0.3),
    },
  },
  breakpoints: {
    unit: 'rem',
    values: {
      xs: 0,
      sm: 37.5,
      md: 56,
      lg: 75,
      xl: 96,
    }
  },
  typography: {
    fontFamily: "'sans-serif'",
    fontSize: 16,
    fontWeightBold: 700,
    fontWeightLight: 300,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    button: {
      fontSize: '1rem',
      textTransform: 'none',
      fontWeight: 500,
      lineHeight: 'normal',
    }
  }
});

export default theme;