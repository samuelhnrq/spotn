// api.ts
import { trpcClient } from "../trpc";
import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { ArtistSearchResult, GuessAnswer } from "../models";

const baseQuery: BaseQueryFn<Promise<unknown>> = async (
  promise: Promise<unknown>,
) => {
  try {
    const data = await promise;
    return { data };
  } catch (error) {
    return { error };
  }
};

// Enhance the api with hooks
export const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    searchArtist: builder.query<ArtistSearchResult[], string>({
      query: (arg) => trpcClient.artists.searchArtist.query(arg),
    }),
    guessArtist: builder.mutation<GuessAnswer, ArtistSearchResult>({
      query: (arg) => trpcClient.artists.guessArtist.mutate(arg.id),
    }),
  }),
});

export const {
  useSearchArtistQuery,
  useLazySearchArtistQuery,
  useGuessArtistMutation,
} = api; // <- export your typed hooks!
