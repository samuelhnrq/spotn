"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Provider as ReduxProvider } from "react-redux";

import { theme } from "@/lib/theme";
import { useRef, type PropsWithChildren } from "react";
import { makeStore, type AppStore } from "@/lib/state";

function Providers({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReduxProvider store={storeRef.current}>{children}</ReduxProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

export default Providers;
