"use client";

import { colors, createTheme } from "@mui/material";
import { GeistSans } from "geist/font/sans";

export const theme = createTheme({
  palette: {
    primary: colors.purple,
    secondary: colors.blue,
  },
  typography: {
    fontFamily: `${GeistSans.style.fontFamily}, sans-serif`,
  },
});
