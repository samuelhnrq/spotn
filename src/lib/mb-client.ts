import ky from "ky";
import type { MbArtist } from "./mb-models";

export interface MbSearchResult {
  name: string;
  mbid: string;
}

interface MbSearchResponse {
  artists: MbArtist[];
  count: number;
  offset: number;
  created: string;
}

const kyClient = ky.extend({
  headers: {
    "User-Agent": "Spotn/0.1.0 (https://github.com/samuelhnrq/spotn)",
  },
});

export async function searchArtist(
  artistName: string,
): Promise<MbSearchResult[]> {
  if (!artistName || artistName.length < 3) {
    return [];
  }
  const resp = await kyClient
    .get("https://musicbrainz.org/ws/2/artist/", {
      searchParams: {
        query: artistName,
      },
    })
    .json<MbSearchResponse>();
  return resp.artists.map((x) => ({
    mbid: x.id,
    name: x.name,
  }));
}

export async function getArtistById(mbid: string): Promise<MbArtist> {
  return kyClient
    .get(`https://musicbrainz.org/ws/2/artist/${mbid}`, {
      searchParams: { inc: "release-groups artist-rels" },
    })
    .json<MbArtist>();
}
