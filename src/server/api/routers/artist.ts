import { createTRPCRouter } from "@/server/api/trpc";
import guessArtist from "../procedures/guessArtist";
import searchArtist from "../procedures/searchArtist";

export const artistRouter = createTRPCRouter({
  guessArtist,
  searchArtist,
});
