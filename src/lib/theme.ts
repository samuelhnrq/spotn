"use client";

import { colors, createTheme } from "@mui/material";
import { GeistSans } from "geist/font/sans";

export const theme = createTheme({
  defaultColorScheme: "dark",
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: colors.indigo[300],
      ...colors.indigo,
    },
    secondary: colors.pink,
  },
  typography: {
    fontFamily: `${GeistSans.style.fontFamily}, sans-serif`,
  },
});
