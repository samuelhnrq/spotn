import { createTRPCRouter } from "@/server/api/trpc";
import getTodayArtist from "../getTodayArtist";
import guessArtist from "../guessArtist";

export const artistRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  guessArtist,

  getTodayArtist,

  // searchByName: publicProcedure.input(z.string()).query(({ ctx, input }) => {
  //   return ctx.db.artist.findMany({ where: { name: { contains: input } } });
  // }),

  // create: publicProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //       },
  //     });
  //   }),

  // getLatest: publicProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //   });

  //   return post ?? null;
  // }),
});
