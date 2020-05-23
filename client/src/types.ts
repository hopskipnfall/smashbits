export interface Author {
  personId: string;
  name: string;
}

export interface Bit {
  postId: string;
  author: Author;
  dateCreated: number;
  upvotes: number;
  downvotes: number;
  title: string;
  content: string;
  mainChars?: string[];
  standaloneTags?: string[];
  stages?: string[];
  vsChars?: string[];
}
