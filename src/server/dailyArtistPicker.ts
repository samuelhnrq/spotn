import { type Artist, Gender } from "@prisma/client";

export function getTodaysArtist(): Artist {
  return {
    artistGid: "uuid",
    debutYear: 2002,
    gender: Gender.Female,
    genre: "Pop",
    members: 1,
    name: "Taylor Swift",
    rank: 4,
    country: "br",
    createdAt: new Date(),
    id: 1,
    listens: BigInt(111),
    updatedAt: new Date(),
  };
}
