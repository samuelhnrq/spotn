import { createTRPCRouter } from "@/server/api/trpc";
import guessArtist from "../procedures/guessArtist";
import listGuesses from "../procedures/listGuesses";
import searchArtist from "../procedures/searchArtist";

export const artistRouter = createTRPCRouter({
  guessArtist,
  listGuesses,
  searchArtist,
});
