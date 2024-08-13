import { trpcClient } from "@/trpc/react";
import type { ArtistSearchResult, GuessAnswer } from "./models";

export async function searchArtist(
  artistName: string,
): Promise<ArtistSearchResult[]> {
  try {
    return await trpcClient.artists.searchArtist.query(artistName);
  } catch {
    return [];
  }
}

export async function guessArtist(
  guess: ArtistSearchResult,
): Promise<GuessAnswer> {
  return trpcClient.artists.guessArtist.query(guess.mbid);
}
