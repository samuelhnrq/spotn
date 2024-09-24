import { api } from "@/trpc/react";

export function useGuesses() {
  const result = api.artists.listGuesses.useSuspenseQuery();
  return result;
}
