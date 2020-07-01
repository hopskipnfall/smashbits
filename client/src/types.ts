import * as Immutable from 'immutable';

const shallowClone = (a: any[]) => [...a];

export interface Author {
  personId: string;
  name: string;
}

export type Vote = -1 | 0 | 1;

export class Bit {
  postId: string;
  author: Author;
  dateCreated: number;
  upvotes: number;
  downvotes: number;
  title: string;
  content: string;
  mainChars: string[];
  standaloneTags: string[];
  stages: string[];
  vsChars: string[];
  userVote: Vote;
  comments: Immutable.Set<any>;
  isRequestingComments: boolean;

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
