import { z } from "zod";
import { publicProcedure } from "../trpc";
import type { ArtistSearchResult } from "@/lib/models";
import { db } from "@/server/db";

export default publicProcedure
  .input(z.string().min(3))
  .query(async ({ input }): Promise<ArtistSearchResult[]> => {
    const artists = await db.artist.findMany({
      select: { artistGid: true, name: true },
      where: {
        name: {
          mode: "insensitive",
          contains: input,
        },
      },
    });
    return artists.map(
      (x): ArtistSearchResult => ({
        mbid: x.artistGid,
        name: x.name,
      }),
    );
  });
