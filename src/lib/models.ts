export interface GuessAnswer {
  correct: boolean;
  genderCorrect: boolean;
  genreCorrect: boolean;
  membersDelta: number;
  debutYearDelta: number;
  rankDelta: number;
}

export enum ArtistGender {
  Male,
  Female,
  Queer,
  Mixed,
}

export interface Artist {
  name: string;
  gender: ArtistGender;
  genre: string;
  members: number;
  debutYear: number;
  rank: number;
}
