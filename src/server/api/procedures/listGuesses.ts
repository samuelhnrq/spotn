import type { GuessAnswer } from "@/lib/models";
import { compareEntities } from "@/server/lib/comparator";
import { getTodayArtist } from "@/server/lib/dailyPicker";
import { DateTime } from "luxon";
import { z } from "zod";
import { privateProcedure } from "../trpc";

function fromIsoOrNow(input?: string): DateTime {
  if (input) {
    try {
      return DateTime.fromISO(input, { zone: "UTC" });
    } catch (err) {
      console.error("failed to parse date", input, err);
    }
  }
  return DateTime.now().toUTC();
}

export default privateProcedure
  .input(z.string().datetime().optional())
  .query(async ({ ctx: { db, user }, input }): Promise<GuessAnswer[]> => {
    console.log("Im here", user.userId);
    const date = fromIsoOrNow(input);
    const today = await getTodayArtist();
    const guesses = await db.userGuess.findMany({
      where: {
        day: { day: date.startOf("day").toJSDate() },
        userId: user.userId,
      },
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
