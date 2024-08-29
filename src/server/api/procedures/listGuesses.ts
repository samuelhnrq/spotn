import type { GuessAnswer } from "@/lib/models";
import { compareEntities } from "@/server/lib/comparator";
import { getTodayArtist } from "@/server/lib/dailyPicker";
import { DateTime } from "luxon";
import { z } from "zod";
import { privateProcedure } from "../trpc";

export default privateProcedure
  .input(z.string().datetime().optional())
  .query(async ({ ctx: { db, user }, input }): Promise<GuessAnswer[]> => {
    const date = input
      ? DateTime.fromISO(input, { zone: "UTC" })
      : DateTime.now().toUTC();
    const today = await getTodayArtist();
    const guesses = await db.userGuess.findMany({
      where: { day: { day: date.startOf("day").toJSDate() }, userId: user.id },
      include: {
        guess: {
          include: {
            props: {
              include: { prop: true },
              omit: { createdAt: true, updatedAt: true },
            },
          },
          omit: { createdAt: true, updatedAt: true },
        },
      },
    });
    return guesses.map((x) => compareEntities(today.entity, x));
  });
