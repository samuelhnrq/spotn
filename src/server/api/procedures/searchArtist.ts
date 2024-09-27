import "server-only";

import type { ArtistSearchResult } from "@/lib/models";
import { db } from "@/server/db";
import { z } from "zod";
import { protectedProcedure } from "../trpc";

export default protectedProcedure
  .input(z.string())
  .query(async ({ input, ctx: { session } }): Promise<ArtistSearchResult[]> => {
    if (input.length < 3) {
      return db.entity.findMany({
        select: { id: true, name: true },
        take: 20,
        orderBy: { name: "asc" },
      });
    }
    const artists = await db.entity.findMany({
      select: {
        id: true,
        name: true,
        UserGuess: {
          where: {
            userId: { not: session?.user?.email || undefined },
          },
        },
      },
      take: 20,
      orderBy: { name: "asc" },
      where: {
        name: {
          mode: "insensitive",
          contains: input,
        },
      },
    });
    return artists;
  });
