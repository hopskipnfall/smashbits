import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  id: String,
  twitterProfile: {
    type: Map,
    of: Object,
  },
});

// Hack to prevent us from initializing the model multiple times. See
// https://github.com/dherault/serverless-offline/issues/258.
global.User = global.User || model('User', userSchema);
export default global.User;
