import * as Immutable from 'immutable';

// TODO: Split this file up and put things where they belong.

const shallowClone = (a: any[]) => [...a];

export class Profile {
  user: {
    twitterProfile: { displayName: string }
  };

  constructor(data?: { [key: string]: any }) {
    data = data || {};

    this.user = data.user || { twitterProfile: { displayName: '' } };
  }
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export interface Author {
  personId: string;
  name: string;
}

export class Comment {
  id: string;
  postId: string;
  author: Author;
  dateCreated: number;
  content: string;

  constructor(data?: { [key: string]: any }) {
    data = data || {};

    this.id = data.id;
    this.postId = data.postId;
    this.author = data.author;
    this.dateCreated = data.dateCreated;
    this.content = data.content;
  }
}

export type Vote = -1 | 0 | 1;

export class Bit {
  author: Author;
  // TODO rename to commentIds
  comments: Immutable.Set<string>;
  content: string;
  dateCreated: number;
  downvotes: number;
  isRequestingComments: boolean;
  mainChars: Character[];
  postId: string;
  stages: Stage[];
  standaloneTags: Label[];
  title: string;
  upvotes: number;
  userVote: Vote;
  vsChars: Character[];

  constructor(data?: { [key: string]: any }) {
    data = data || {};

    this.postId = data.postId;
    this.author = data.author;
    this.dateCreated = data.dateCreated;
    this.upvotes = data.upvotes || 0;
    this.downvotes = data.downvotes;
    this.title = data.title;
    this.content = data.content;
    this.mainChars = shallowClone(data.mainChars || []);
    this.standaloneTags = shallowClone(data.standaloneTags || []);
    this.stages = shallowClone(data.stages || []);
    this.vsChars = shallowClone(data.vsChars || []);
    this.userVote = data.userVote || 0;
    this.comments = Immutable.Set();
    this.isRequestingComments = data.isRequestingComments || false;
  }
}

/** Deep immutable wrapper. */
export type Readonly<T> = {
  readonly [K in keyof T]: Readonly<T[K]>;
};

export interface FilterParameter {
  id: string
  display: string
}

export type CharacterId = 'lu' | 'ma' | 'do' | 'li' | 'sa' | 'ca' | 'ne' | 'yo' | 'ki' | 'fo' | 'pi' | 'pu';
export type Character = {
  id: CharacterId
  display: string
}

export const CHARACTER_MAP = new Map<CharacterId, Character>([
  ['lu', { id: 'lu', display: 'Luigi' } as const],
  ['ma', { id: 'ma', display: 'Mario' } as const],
  ['do', { id: 'do', display: 'Donkey Kong' } as const],
  ['li', { id: 'li', display: 'Link' } as const],
  ['sa', { id: 'sa', display: 'Samus' } as const],
  ['ca', { id: 'ca', display: 'Captain Falcon' } as const],
  ['ne', { id: 'ne', display: 'Ness' } as const],
  ['yo', { id: 'yo', display: 'Yoshi' } as const],
  ['ki', { id: 'ki', display: 'Kirby' } as const],
  ['fo', { id: 'fo', display: 'Fox' } as const],
  ['pi', { id: 'pi', display: 'Pikachu' } as const],
  ['pu', { id: 'pu', display: 'Jigglypuff' } as const],
]);
export const CHARACTER_MAP_REVERSE = new Map(
  Array.from(CHARACTER_MAP).map(e => [e[1].display, e[1]])
);

export const ALL_CHARACTERS = new Set(Array.from(CHARACTER_MAP).map(entry => entry[1]));

export type StageId = 'pc' | 'cj' | 'hc' | 'pz' | 'mk' | 'dl' | 'sz' | 'sc' | 'mc' | 'yi' | 'fd' | 'bf';
export type Stage = {
  id: StageId
  display: string
}

export const STAGE_MAP = new Map<StageId, Stage>([
  ['pc', { id: 'pc', display: 'Peach\'s Castle' } as const],
  ['cj', { id: 'cj', display: 'Congo Jungle' } as const],
  ['hc', { id: 'hc', display: 'Hyrule Castle' } as const],
  ['pz', { id: 'pz', display: 'Planet Zebes' } as const],
  ['mk', { id: 'mk', display: 'Mushroom Kingdom' } as const],
  ['dl', { id: 'dl', display: 'Dream Land' } as const],
  ['sz', { id: 'sz', display: 'Sector Z' } as const],
  ['sc', { id: 'sc', display: 'Saffron City' } as const],
  ['mc', { id: 'mc', display: 'Meta Crystal (19xx)' } as const],
  ['yi', { id: 'yi', display: 'Yoshi\'s Island (19xx)' } as const],
  ['fd', { id: 'fd', display: 'Final Destination (19xx)' } as const],
  ['bf', { id: 'bf', display: 'Battlefield (19xx)' } as const],
]);
export const STAGE_MAP_REVERSE = new Map(
  Array.from(STAGE_MAP).map(e => [e[1].display, e[1]])
);

export const ALL_STAGES = new Set(Array.from(STAGE_MAP).map(entry => entry[1]));

export type LabelId = 'ap' | 'ed' | 'co' | 'es';
export type Label = {
  id: LabelId
  display: string
}

export const LABEL_MAP = new Map<LabelId, Label>([
  ['ap', { id: 'ap', display: 'Approach' } as const],
  ['ed', { id: 'ed', display: 'Edge Guarding' } as const],
  ['co', { id: 'co', display: 'Combos' } as const],
  ['es', { id: 'es', display: 'Escapes' } as const],
])
export const LABEL_MAP_REVERSE = new Map(
  Array.from(LABEL_MAP).map(e => [e[1].display, e[1]])
);

export const ALL_LABELS = new Set(Array.from(LABEL_MAP).map(entry => entry[1]));

export const SORT_OPTIONS = ['newest', 'oldest', 'score'];
export type SortOption = typeof SORT_OPTIONS[number];

export const PAGE_SIZES = [10, 25, 42];
export type PageSize = typeof PAGE_SIZES[number];
