// api.ts
import { trpcClient } from "../trpc";
import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { ArtistSearchResult } from "../models";

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
    guessArtist: builder.mutation<void, ArtistSearchResult>({
      query: (arg) => trpcClient.artists.guessArtist.mutate(arg.mbid),
    }),
  }),
});

export const {
  useSearchArtistQuery,
  useLazySearchArtistQuery,
  useGuessArtistMutation,
} = api; // <- export your typed hooks!
