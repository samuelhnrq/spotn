import { type Artist, Gender } from "@prisma/client";
import { DateTime } from "luxon";
import { type MbSearchResult, getArtistById } from "./mb-client";
import type { MbArtist, MbReleaseGroup } from "./mb-models";

type HasDate = Pick<MbReleaseGroup, "first-release-date">;
function daysDiff(isoDateA: HasDate, isoDateB: HasDate): number {
  const dateA = DateTime.fromISO(isoDateA["first-release-date"]);
  const dateB = DateTime.fromISO(isoDateB["first-release-date"]);
  return dateA.diff(dateB, "days").days;
}

function getDebutAlbumYear(artist: MbArtist): number {
  const albums = (artist["release-groups"] || []).filter(
    (x) => x["secondary-types"].length === 0,
  );
  if (albums.length === 0) {
    return 0;
  }
  albums.sort(daysDiff);
  return DateTime.fromISO(albums[0]["first-release-date"]).year;
}

// function getMembers(artist: MbArtist): MbArtist[] {
//   return artist.relations
//     .filter((x) => x.type === "member of band")
//     .map((x) => x.artist);
// }

function getArtistGender(artist: MbArtist): Gender {
  // const members = getMembers(artist);
  return artist.name.length % 2 === 0 ? Gender.Male : Gender.Female;
}

function getArtistGenre(artist: MbArtist): string {
  return artist.name.substring(5);
}

function getArtistMembers(artist: MbArtist): number {
  return artist.name.length % 6;
}

export async function getArtist(searched: MbSearchResult): Promise<Artist> {
  const mbArtist = await getArtistById(searched.mbid);
  return {
    artistGid: mbArtist.id,
    debutYear: getDebutAlbumYear(mbArtist),
    gender: getArtistGender(mbArtist),
    genre: getArtistGenre(mbArtist),
    members: getArtistMembers(mbArtist),
    rank: 1,
    country: "test",
    createdAt: new Date(),
    updatedAt: new Date(),
    listens: BigInt(111),
    id: 111,
    name: mbArtist.name,
  };
}
