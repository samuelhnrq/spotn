import type { Metadata } from "next";

import { GeistSans } from "geist/font/sans";
import type { PropsWithChildren } from "react";

import Providers from "./Providers";
import { cookies } from "next/headers";
import { makeEmptyState, PERSISTENCE_KEY } from "@/lib/state";
import SuperJSON from "superjson";
import type { SpotnState } from "@/lib/models";

export const metadata: Metadata = {
  title: "Spotn",
  description: "Spotting the artist",
};

export default function RootLayout({ children }: PropsWithChildren) {
  const cookieVal = cookies().get(PERSISTENCE_KEY)?.value;
  const preloaded = cookieVal
    ? SuperJSON.parse<SpotnState>(cookieVal)
    : makeEmptyState();
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <Providers serverState={preloaded}>{children}</Providers>
      </body>
    </html>
  );
}
