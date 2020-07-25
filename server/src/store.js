import uuid from 'uuid';
import {connect, connection} from 'mongoose';
import { SORT_PARAM_DATE, SORT_PARAM_SCORE } from './shared/query_params';
import Bit from './Bit';
import User from './User';

const DEFAULT_PAGE_SIZE = 25;

// mongoose.Promise = global.Promise;
connect(process.env.STORE_URI);

export function getMongooseConnection() {
  return connection;
}

export function queryBit({ bitId }) {
  return Bit.findOne({ postId: bitId }).exec();
}

export function queryBits({
  sort = SORT_PARAM_DATE,
  offset = 0,
  limit = DEFAULT_PAGE_SIZE,
  mainChars,
  vsChars,
  stages,
  standaloneTags,
} = {}) {
  // Don't expose the DB ID to clients.
  const projectionParams = { _id: 0 };
  let sortParams = {};
  const filters = {
    ...(mainChars && { mainChars: { $in: mainChars } }),
    ...(vsChars && { vsChars: { $in: vsChars } }),
    ...(stages && { stages: { $in: stages } }),
    ...(standaloneTags && { tags: { $in: standaloneTags } }),
  };
  let query = Bit.aggregate().project(projectionParams);
  query = filters ? query.match(filters) : query;
  switch (sort) {
    case SORT_PARAM_SCORE:
      sortParams = { score: -1, upvotes: -1, dateCreated: -1 };
      query = query.addFields({
        score: { $subtract: ['$upvotes', '$downvotes'] },
      });
      break;
    case SORT_PARAM_DATE:
    default:
      sortParams = { dateCreated: -1 };
      break;
  }
  return query.sort(sortParams).skip(offset).limit(limit).exec();
}

export function putBit(bit) {
  const params = {
    postId: uuid.v1(),
    dateCreated: new Date().getTime(),
    upvotes: 0,
    downvotes: 0,
    ...bit,
  };

  return new Promise((resolve, reject) => {
    Bit.create(params)
      .then(data => resolve(params))
      .catch(err => reject(err));
  });
}

export function queryUser({
  id,
  twitterId,
} = {}) {
  if (id) {
    return User.findOne({ id }).exec();
  }
  if (twitterId) {
    return User.findOne({ 'twitterProfile.id': twitterId }).exec();
  }
}

export function putTwitterUser(profile) {
  const params = {
    id: uuid.v1(),
    twitterProfile: profile,
  };

  return new Promise((resolve, reject) => {
    User.create(params)
      .then(data => resolve(params))
      .catch(err => reject(err));
  });
}

export function queryComments(bitId) {
  /* Not implemented */
}
