import type { Artist } from "@prisma/client";
import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { mergeScan } from "rxjs";
import type { MbSearchResult } from "./mb-client";
import { getArtist } from "./mb-service";

export interface SpotnState {
  guesses: Artist[];
}
const emptyState: SpotnState = { guesses: [] };

const [selectedArtist$, setSelectedArtist] = createSignal<MbSearchResult>();

const [useAppState, appState$] = bind(
  selectedArtist$.pipe(
    mergeScan<MbSearchResult, SpotnState>(
      async (acc, next): Promise<SpotnState> => ({
        guesses: [...acc.guesses, await getArtist(next)],
      }),
      emptyState,
    ),
  ),
  emptyState,
);

export { setSelectedArtist, useAppState, appState$ };
