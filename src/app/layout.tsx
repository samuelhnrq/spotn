import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";

import { theme } from "@/lib/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { GeistSans } from "geist/font/sans";
import type { PropsWithChildren } from "react";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Spotn",
  description: "Spotting the artist",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
