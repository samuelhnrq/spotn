import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { mergeScan } from "rxjs";
import type { ArtistSearchResult, GuessAnswer } from "./models";
import { guessArtist } from "./mb-client";

export interface SpotnState {
  guesses: GuessAnswer[];
}
const emptyState: SpotnState = { guesses: [] };

const [selectedArtist$, setSelectedArtist] = createSignal<ArtistSearchResult>();

const [useAppState, appState$] = bind(
  selectedArtist$.pipe(
    mergeScan<ArtistSearchResult, SpotnState>(
      async (acc, next): Promise<SpotnState> => {
        const guess = await guessArtist(next);
        if (guess) {
          console.log("answer for", next.name, guess);
          return {
            guesses: [...acc.guesses, guess],
          };
        }
        return acc;
      },
      emptyState,
    ),
  ),
  emptyState,
);

export { setSelectedArtist, useAppState, appState$ };
