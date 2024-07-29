export interface GuessAnswer {
  correct: boolean;
  genderCorrect: boolean;
  genreCorrect: boolean;
  membersDelta: number;
  debutYearDelta: number;
  rankDelta: number;
}

/* eslint-disable no-unused-vars */
export enum ArtistGender {
  Male,
  Female,
  Queer,
  Mixed,
}
/* eslint-enable no-unused-vars */

export interface Artist {
  name: string;
  gender: ArtistGender;
  genre: string;
  members: number;
  debutYear: number;
  rank: number;
}
