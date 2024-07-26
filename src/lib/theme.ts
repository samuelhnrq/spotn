"use client";

import { colors, createTheme } from "@mui/material";
import { GeistSans } from "geist/font/sans";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: colors.indigo,
    secondary: colors.pink,
  },
  typography: {
    fontFamily: `${GeistSans.style.fontFamily}, sans-serif`,
  },
});
