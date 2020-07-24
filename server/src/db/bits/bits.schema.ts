import { Schema } from "mongoose";
import { queryBits } from "./bits.statics";

export const BitsSchema = new Schema({
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

BitsSchema.statics.queryBits = queryBits;
