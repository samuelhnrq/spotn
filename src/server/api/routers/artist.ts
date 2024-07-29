import { createTRPCRouter } from "@/server/api/trpc";
import getTodayArtist from "../getTodayArtist";
import guessArtist from "../guessArtist";

export const artistRouter = createTRPCRouter({
  guessArtist,
  getTodayArtist,
});
