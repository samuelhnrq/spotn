import { z } from "zod";
import { publicProcedure } from "./trpc";
import type { GuessAnswer } from "@/lib/models";

export default publicProcedure
  .input(z.string().uuid())
  .query(({ input }): GuessAnswer => {
    console.log(input);
    return {
      correct: false,
      debutYearDelta: 1,
      genderCorrect: false,
      genreCorrect: true,
      membersDelta: 3,
      rankDelta: 1,
    };
  });
