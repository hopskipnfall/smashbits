import { Document, Model, model, Schema } from 'mongoose';
import * as methods from './bits.methods';
import * as statics from './bits.statics';

export interface Media {
  uri: String;
}

export interface Bit {
  postId: string;
  dateCreated: number;
  author: {
    name: string;
    personId: string;
  };
  upvotes: number;
  downvotes: number;
  title: string;
  content: string;
  media: Media[];
  mainChars: string[];
  vsChars: string[];
  stages: string[];
  tags: string[];
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
  media: [
    {
      uri: String,
    },
  ],
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

/** Bits model to interact with (represents a table). */
export const BitsModel = model<BitDocument>('Post', BitsSchema) as IBitsModel;
