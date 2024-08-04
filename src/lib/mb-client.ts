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
): Promise<GuessAnswer | null> {
  try {
    return await trpcClient.artists.guessArtist.query(guess.mbid);
  } catch (err) {
    console.error(err);
    return null;
  }
}
