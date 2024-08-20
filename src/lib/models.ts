import type { Artist } from "@prisma/client";

export interface GuessesState {
  guesses: GuessAnswer[];
  hasCorrectGuess: boolean;
  loading: boolean;
  date: number;
}

export interface GuessAnswer {
  artist: Omit<Artist, "updatedAt" | "createdAt">;
  correct: boolean;
  genderCorrect: boolean;
  countryCorrect: boolean;
  genreCorrect: boolean;
  membersDelta: number;
  debutYearDelta: number;
  rankDelta: number;
}

export interface ArtistSearchResult {
  name: string;
  mbid: string;
}
