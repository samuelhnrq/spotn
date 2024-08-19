import type { GuessAnswer } from "@/lib/models";
import { z } from "zod";
import { publicProcedure } from "../trpc";
import { db } from "@/server/db";
import { getTodayArtist } from "./getTodayArtist";

function numberCompare(a: number, b: number) {
  const delta = a - b;
  if (delta === 0) return 0;
  if (delta > 0) return 1;
  return -1;
}

export default publicProcedure
  .input(z.string().uuid())
  .mutation(async ({ input: artistId }): Promise<GuessAnswer> => {
    console.log("guessing the ", artistId);
    const guessedArtist = await db.artist.findUniqueOrThrow({
      where: { artistGid: artistId },
    });
    const todayAnswer = await getTodayArtist();
    return {
      artist: guessedArtist,
      correct: todayAnswer.id === guessedArtist.id,
      genderCorrect: guessedArtist.gender === todayAnswer.gender,
      genreCorrect: guessedArtist.genre === todayAnswer.genre,
      countryCorrect: guessedArtist.country === todayAnswer.country,
      debutYearDelta: numberCompare(
        guessedArtist.debutYear,
        todayAnswer.debutYear,
      ),
      membersDelta: numberCompare(guessedArtist.members, todayAnswer.members),
      rankDelta: numberCompare(guessedArtist.rank, todayAnswer.rank),
    };
  });
