import type { Metadata } from "next";

import { GeistSans } from "geist/font/sans";
import type { PropsWithChildren } from "react";

import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Spotn",
  description: "Spotting the artist",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
