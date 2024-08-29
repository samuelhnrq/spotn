import type {
  EntityWithProps,
  GuessAnswer,
  NumericalPropComparison,
  PropComparison,
} from "@/lib/models";
import type { EntityPropType, UserGuess } from "@prisma/client";
import * as R from "ramda";

type Prop = EntityWithProps["props"][number];

const COMPARISON_FUNCTIONS: Record<
  EntityPropType,
  (a: Prop, b: Prop) => PropComparison
> = {
  NUMERICAL: compareNumericalProp,
  CATEGORICAL: compareCategoricalProp,
  CHRONOLOGICAL: compareCategoricalProp,
  GEOGRAPHICAL: compareCategoricalProp,
};

function compareNumericalProp(
  guess: Prop,
  answer: Prop,
): NumericalPropComparison {
  if (guess.value === answer.value) {
    return {
      kind: "NUMERICAL",
      correct: true,
      propId: guess.prop.id,
      value: guess.value,
      name: guess.prop.name,
      difference: 0,
    };
  }
  if (guess.value > answer.value) {
    return {
      kind: "NUMERICAL",
      correct: false,
      propId: guess.prop.id,
      value: guess.value,
      name: guess.prop.name,
      difference: 1,
    };
  }
  return {
    propId: guess.prop.id,
    value: guess.value,
    kind: "NUMERICAL",
    correct: false,
    name: guess.prop.name,
    difference: -1,
  };
}

function compareCategoricalProp(guess: Prop, answer: Prop): PropComparison {
  if (guess.value === answer.value) {
    return {
      kind: guess.prop.type,
      propId: guess.prop.id,
      correct: true,
      name: guess.prop.name,
      value: guess.value,
    };
  }
  return {
    propId: guess.prop.id,
    value: guess.value,
    kind: "CATEGORICAL",
    correct: false,
    name: guess.prop.name,
  };
}

function compareProp(guess: Prop, answer: Prop): PropComparison {
  if (guess.prop.id !== answer.prop.id) throw new Error("Props not equal");
  return COMPARISON_FUNCTIONS[guess.prop.type](guess, answer);
}

export interface UserGuessType extends UserGuess {
  guess: EntityWithProps;
}

export function compareEntities(
  answer: EntityWithProps,
  userGuess: UserGuessType,
): GuessAnswer {
  const guess = userGuess.guess;
  const propSorter = R.sortBy(R.prop("propId"));
  const guessProps = propSorter(guess.props);
  const answerProps = propSorter(answer.props);
  const comparisions = R.zipWith(compareProp, guessProps, answerProps);
  return {
    id: userGuess.id.toString(),
    artist: guess,
    correct: R.all<PropComparison>(R.prop("correct"), comparisions),
    comparisions,
  };
}
