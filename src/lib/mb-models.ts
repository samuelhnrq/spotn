export interface MbArtist {
  id: string;
  type: string;
  "type-id": string;
  score: number;
  "gender-id": string;
  name: string;
  "sort-name": string;
  gender: string;
  country: string;
  relations: MbRelation[];
  area: MbArea;
  "begin-area": BeginArea;
  ipis: string[];
  isnis: string[];
  "life-span": MbLifeSpan;
  aliases: MbAlias[];
  tags: MbTag[];
  "release-groups"?: MbReleaseGroup[];
}

export interface MbRelation {
  "target-credit": string;
  artist: MbArtist;
  ended: boolean;
  end?: string;
  "type-id": string;
  "target-type": string;
  attributes: string[];
  type: string;
  "source-credit": string;
  begin?: string;
  direction: string;
}

export interface MbReleaseGroup {
  disambiguation: string;
  "secondary-types": string[];
  "first-release-date": string;
  "secondary-type-ids": string[];
  "primary-type": string;
  id: string;
  title: string;
  "primary-type-id": string;
}

export interface MbArea {
  id: string;
  type: string;
  "type-id": string;
  name: string;
  "sort-name": string;
  "life-span": MbLifeSpan;
}

export interface MbLifeSpan {
  begin?: string | null;
  ended?: string | null;
}

export interface BeginArea {
  id: string;
  type: string;
  "type-id": string;
  name: string;
  "sort-name": string;
  "life-span": MbLifeSpan;
}

export interface MbAlias extends MbLifeSpan {
  "sort-name": string;
  "type-id": string;
  name: string;
  locale?: string;
  type: string;
  primary?: boolean;
}

export interface MbTag {
  count: number;
  name: string;
}
