import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import Providers from "./Providers";
import ServerProvider from "./ServerProvider";
import { HydrateClient } from "@/lib/trpc-server-client";

export const metadata: Metadata = {
  title: "Spotn",
  description: "Spotting the artist",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <ServerProvider>
          <Providers>
            <HydrateClient>{children}</HydrateClient>
          </Providers>
        </ServerProvider>
      </body>
    </html>
  );
}
