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
  area: Area;
  "begin-area": BeginArea;
  ipis: string[];
  isnis: string[];
  "life-span": LifeSpan;
  aliases: Alias[];
  tags: Tag[];
}

export interface Area {
  id: string;
  type: string;
  "type-id": string;
  name: string;
  "sort-name": string;
  "life-span": LifeSpan;
}

export interface LifeSpan {
  begin?: string | null;
  ended?: string | null;
}

export interface BeginArea {
  id: string;
  type: string;
  "type-id": string;
  name: string;
  "sort-name": string;
  "life-span": LifeSpan;
}

export interface Alias extends LifeSpan {
  "sort-name": string;
  "type-id": string;
  name: string;
  locale?: string;
  type: string;
  primary?: boolean;
}

export interface Tag {
  count: number;
  name: string;
}
