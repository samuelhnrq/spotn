import { api } from "@/trpc/react";

export function useGuesses() {
  const result = api.artists.listGuesses.useSuspenseQuery(undefined, {
    notifyOnChangeProps: "all",
  });
  return result[1];
}
