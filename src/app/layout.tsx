import { TRPCReactProvider } from "@/trpc/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import Providers from "./Providers";
import ServerProvider from "./ServerProvider";

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
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </Providers>
        </ServerProvider>
      </body>
    </html>
  );
}
