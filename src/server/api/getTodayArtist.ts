import type { Artist } from "@prisma/client";
import { getTodaysArtist } from "../dailyArtistPicker";
import { publicProcedure } from "./trpc";

export default publicProcedure.query((): Artist => {
  return getTodaysArtist();
});
