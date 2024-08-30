"use client";

import type { AppRouter } from "@/server/api/root";
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  type CreateTRPCClientOptions,
  type TRPCUntypedClient,
  createTRPCClient,
  httpBatchLink,
  loggerLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import SuperJSON from "superjson";
import { makeQueryClient } from "./query-client";

export const queryTrpc = createTRPCReact<AppRouter>();

let clientQueryClientSingleton: QueryClient;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  clientQueryClientSingleton ??= makeQueryClient();
  return clientQueryClientSingleton;
}

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

// Config is isolated because I like having the vanilla client besides the untyped one of the context
const trpcClientConfig: CreateTRPCClientOptions<AppRouter> = {
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    httpBatchLink({
      transformer: SuperJSON, // <-- if you use a data transformer
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
};

export const trpcClient = createTRPCClient<AppRouter>(trpcClientConfig);

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const queryClient = getQueryClient();
  const [trpcClientRef] = useState<TRPCUntypedClient<AppRouter>>(() =>
    queryTrpc.createClient(trpcClientConfig),
  );
  return (
    <queryTrpc.Provider client={trpcClientRef} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </queryTrpc.Provider>
  );
}
