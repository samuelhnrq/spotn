import type { GuessAnswer } from "@/lib/models";
import { db } from "@/server/db";
import { compareEntities } from "@/server/lib/comparator";
import { getTodayArtist } from "@/server/lib/getTodayArtist";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { publicProcedure } from "../trpc";

export default publicProcedure
  .input(z.number().positive())
  .mutation(async ({ input: artistId, ctx }): Promise<GuessAnswer> => {
    auth().protect();
    const guessedArtist = await db.entity.findUniqueOrThrow({
      where: { id: artistId },
      include: { props: { include: { prop: true } } },
    });
    const todayAnswer = await getTodayArtist();

    return compareEntities(guessedArtist, todayAnswer);
  });
