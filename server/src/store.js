import uuid from 'uuid';
import mongoose from 'mongoose';
import Bit from './Bit';

const DEFAULT_PAGE_SIZE = 25;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.STORE_URI);

export const SORT_DATE = Symbol.for('date');
export const SORT_SCORE = Symbol.for('score');

export function queryBit({ bitId }) {
  return Bit.findOne({ postId: bitId }).exec();
}

export function queryBits({ sort=SORT_DATE, offset=0, limit=DEFAULT_PAGE_SIZE }) {
  // Don't expose the DB ID to clients.
  var projectionParams = { _id: 0 };
  var sortParams = {};

  var query = Bit.aggregate().project(projectionParams);
  switch (sort) {
    case SORT_SCORE:
      sortParams = { score: -1, upvotes: -1, dateCreated: -1 };
      query = query.addFields({ score: { $subtract: [ '$upvotes', '$downvotes' ]}});
      break;
    case SORT_DATE:
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
    ...bit
  };

  return new Promise((resolve, reject) => {
    Bit.create(params)
        .then(data => resolve(params))
        .catch(err => reject(err));
  });
}

export function queryComments(bitId) {
  /* Not implemented */
}