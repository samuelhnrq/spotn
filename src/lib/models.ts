import type { Artist } from "@prisma/client";

export interface SpotnState {
  guesses: GuessesState;
}

export interface GuessesState {
  guesses: GuessAnswer[];
  hasCorrectGuess: boolean;
  loading: boolean;
  date: Date;
}

export interface GuessAnswer {
  artist: Artist;
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
