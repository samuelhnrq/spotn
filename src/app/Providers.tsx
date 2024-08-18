"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Provider as ReduxProvider } from "react-redux";

import { theme } from "@/lib/theme";
import { useRef, type PropsWithChildren } from "react";
import type { SpotnState } from "@/lib/models";
import { makeStore, type AppStore } from "@/lib/state";

export interface ProvidersProps {
  serverState?: SpotnState;
}

function Providers({
  children,
  serverState,
}: PropsWithChildren<ProvidersProps>) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore(serverState);
  }
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReduxProvider store={storeRef.current} serverState={serverState}>
          {children}
        </ReduxProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

export default Providers;
