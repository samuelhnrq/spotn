"use client";

import { type AppStore, makeStore } from "@/lib/state";
import { theme } from "@/lib/theme";
import { ClerkProvider } from "@clerk/nextjs";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { type PropsWithChildren, useRef } from "react";
import { Provider as ReduxProvider } from "react-redux";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "always", // or 'always' to create profiles for anonymous users as well
  });
}

function Providers({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <PostHogProvider client={posthog}>
      <AppRouterCacheProvider>
        <ClerkProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ReduxProvider store={storeRef.current}>{children}</ReduxProvider>
          </ThemeProvider>
        </ClerkProvider>
      </AppRouterCacheProvider>
    </PostHogProvider>
  );
}

export default Providers;
