import { getTodaysArtist } from "../dailyArtistPicker";
import { publicProcedure } from "./trpc";
import type { Artist } from "@/lib/models";

export default publicProcedure.query((): Artist => {
  return getTodaysArtist();
});
