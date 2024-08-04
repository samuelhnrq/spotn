import type { Artist } from "@prisma/client";
import { db } from "@/server/db";
import { DateTime } from "luxon";

export async function getTodayArtist(): Promise<Artist> {
  const now = DateTime.now();
  const today = await db.dailyArtist.findFirst({
    where: {
      day: now.startOf("day").toJSDate(),
    },
    include: {
      artist: true,
    },
    orderBy: {
      day: "desc",
    },
  });
  if (today) {
    console.log("already picked today", today.artist.name);
    return today.artist;
  }
  let randomArtist: Artist | null = null;
  while (!randomArtist) {
    const [nextArtist] = await db.$queryRaw<Artist[]>`
      SELECT * from "Artist" TABLESAMPLE BERNOULLI(10) limit 1;
    `;
    if (nextArtist) {
      randomArtist = nextArtist;
    }
  }
  const newDaily = await db.dailyArtist.create({
    data: {
      day: now.startOf("day").toJSDate(),
      artistId: randomArtist.id,
    },
    include: { artist: true },
  });
  return newDaily.artist;
}
