import { Schema, Document, Model, model } from "mongoose";
import * as statics from "./bits.statics";
import * as methods from './bits.methods';

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

const BitsSchema = new Schema<typeof methods>({
  postId: String,
  dateCreated: Number,
  author: {
    name: String,
    personId: String,
  },
  upvotes: Number,
  downvotes: Number,
  title: String,
  content: String,
  mainChars: [String],
  vsChars: [String],
  stages: [String],
  tags: [String],
});
BitsSchema.statics = statics;
BitsSchema.methods = methods;

/** Type for a bit document. */
export type BitDocument = Bit & Document & typeof methods;

/** Type for the bit model (table, as opposed to document). */
type IBitsModel = Model<BitDocument> & typeof statics;

export const BitsModel = model<BitDocument>('Post', BitsSchema) as IBitsModel;
