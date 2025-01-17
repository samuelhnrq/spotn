import "server-only";

import type { GuessAnswer } from "@/lib/models";
import { compareEntities } from "@/server/lib/comparator";
import { type DayWithProps, getTodayArtist } from "@/server/lib/dailyPicker";
import { TRPCError } from "@trpc/server";
import { DateTime } from "luxon";
import { z } from "zod";
import { protectedProcedure } from "../trpc";

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

export const listGuesses = protectedProcedure
  .input(z.string().datetime().optional())
  .query(async ({ ctx: { db, session }, input }): Promise<GuessAnswer[]> => {
    const date = fromIsoOrNow(input);
    let today: DayWithProps;
    try {
      today = await getTodayArtist();
    } catch (err) {
      if (err instanceof TRPCError && err.code === "NOT_FOUND") {
        return [];
      }
      throw err;
    }
    const guesses = await db.userGuess.findMany({
      where: {
        day: { day: date.startOf("day").toJSDate() },
        userId: session.user?.email || undefined,
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
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    return guesses.map((x) => compareEntities(today.entity, x));
  });
