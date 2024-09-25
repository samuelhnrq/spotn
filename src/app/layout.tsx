import { TRPCReactProvider } from "@/trpc/react";
import { HydrateClient } from "@/trpc/server";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import type { PropsWithChildren } from "react";
import Providers from "./Providers";
import ServerProvider from "./ServerProvider";

export const metadata: Metadata = {
  title: "Spotn",
  description: "Spotting the artist",
};

export default function RootLayout({ children }: PropsWithChildren) {
  const c = cookies();
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <ServerProvider>
          <TRPCReactProvider
            sessionToken={c.get("authjs.session-token")?.value}
          >
            <Providers>
              <HydrateClient>{children}</HydrateClient>
            </Providers>
          </TRPCReactProvider>
        </ServerProvider>
      </body>
    </html>
  );
}
