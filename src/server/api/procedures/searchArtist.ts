import "server-only";

import type { ArtistSearchResult } from "@/lib/models";
import { db } from "@/server/db";
import { z } from "zod";
import { protectedProcedure } from "../trpc";

export default protectedProcedure
  .input(z.string())
  .query(async ({ input }): Promise<ArtistSearchResult[]> => {
    const artists = await db.entity.findMany({
      select: { id: true, name: true },
      where: {
        name: {
          mode: "insensitive",
          contains: input,
        },
      },
    });
    return artists.map(
      (x): ArtistSearchResult => ({
        id: x.id,
        name: x.name,
      }),
    );
  });
