import type {
  Entity,
  EntityProp,
  EntityPropType,
  EntityPropValue,
} from "@prisma/client";

export interface GuessesState {
  guesses: GuessAnswer[];
  hasCorrectGuess: boolean;
  loading: boolean;
  date: number;
}

export interface EntityPropWithValues extends EntityPropValue {
  prop: EntityProp;
}

export interface EntityWithProps extends Entity {
  props: EntityPropWithValues[];
}

export interface NumericalPropComparison extends PropComparison {
  kind: "NUMERICAL";
  difference: -1 | 0 | 1;
}

export interface PropComparison {
  propId: number;
  kind: EntityPropType;
  name: string;
  value: string;
  correct: boolean;
}

export interface GuessAnswer {
  id: string;
  artist: EntityWithProps;
  correct: boolean;
  comparisions: PropComparison[];
}

export interface ArtistSearchResult {
  name: string;
  id: number;
}
