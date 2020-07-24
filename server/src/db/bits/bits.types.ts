import { Document, Model } from "mongoose";
import { queryBits } from "./bits.statics";

export interface Bit {
  postId: string,
  dateCreated: number,
  author: {
    name: string,
    personId: string,
  },
  upvotes: number,
  downvotes: number,
  title: string,
  content: string,
  mainChars: string[],
  vsChars: string[],
  stages: string[],
  tags: string[],
}

export interface BitDocument extends Bit, Document {}

export interface BitModel extends Model<BitDocument> {
  queryBits: typeof queryBits;
}
