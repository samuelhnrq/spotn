import type { GuessAnswer } from "@/lib/models";
import { z } from "zod";
import { publicProcedure } from "../trpc";
import { db } from "@/server/db";
import { getTodayArtist } from "./getTodayArtist";
import { compareEntities } from "@/server/lib/comparator";

export default publicProcedure
  .input(z.number().positive())
  .mutation(async ({ input: artistId }): Promise<GuessAnswer> => {
    const guessedArtist = await db.entity.findUniqueOrThrow({
      where: { id: artistId },
      include: { props: { include: { prop: true } } },
    });
    const todayAnswer = await getTodayArtist();

    return compareEntities(guessedArtist, todayAnswer);
  });
