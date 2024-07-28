import { type Artist, ArtistGender } from "@/lib/models";

export function getTodaysArtist(): Artist {
  return {
    debutYear: 2002,
    gender: ArtistGender.Female,
    genre: "Pop",
    members: 1,
    name: "Taylor Swift",
    rank: 4,
  };
}
