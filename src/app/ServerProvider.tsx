import { theme } from "@/lib/theme";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { PropsWithChildren } from "react";

function ServerProvider({ children }: PropsWithChildren) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </ClerkProvider>
  );
}

export default ServerProvider;
