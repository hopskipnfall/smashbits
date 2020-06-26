import mongoose from 'mongoose';

const bitSchema = new mongoose.Schema({
  postId: String,
  dateCreated: Number,
  upvotes: Number,
  downvotes: Number,
  title: String,
  content: String,
  mainChars: [String],
  vsChars: [String],
  stages: [String],
  tags: [String],
});

// Hack to prevent us from initializing the model multiple times. See
// https://github.com/dherault/serverless-offline/issues/258.
global.Bit = global.Bit || mongoose.model('Post', bitSchema);
export default global.Bit;
