"use client";

import { TRPCReactProvider } from "@/trpc/react";
import { Provider as JotaiProvider } from "jotai";
import { SessionProvider } from "next-auth/react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import type { PropsWithChildren } from "react";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "always", // or 'always' to create profiles for anonymous users as well
  });
}

function Providers({ children }: PropsWithChildren) {
  return (
    <PostHogProvider client={posthog}>
      <SessionProvider>
        <JotaiProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </JotaiProvider>
      </SessionProvider>
    </PostHogProvider>
  );
}

export default Providers;
