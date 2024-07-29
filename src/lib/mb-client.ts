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

export async function searchArtist(
  artistName: string
): Promise<MbSearchResult[]> {
  if (!artistName || artistName.length < 3) {
    return [];
  }
  const test = await ky
    .get("https://musicbrainz.org/ws/2/artist/", {
      headers: {
        "User-Agent": "Spotn/0.1.0 (https://github.com/samuelhnrq/spotn)",
      },
      searchParams: {
        query: artistName,
        // format: "json",
      },
    })
    .json<MbSearchResponse>();
  return test.artists.map((x) => ({
    mbid: x.id,
    name: x.name,
  }));
}
