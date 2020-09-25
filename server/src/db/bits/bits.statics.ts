/**
 * "Static" methods on the table.
 *
 * Each exported method must have "this: AbbreviatedModel"
 * as the first parameter.
 * @packageDocumentation
 */

import { Model } from 'mongoose';
import * as uuid from 'uuid';
import { SORT_PARAM_DATE, SORT_PARAM_SCORE } from '../../shared/query_params';
import { Bit, BitDocument } from './bits.schema';

const DEFAULT_PAGE_SIZE = 25;

// Not using BitModel here as that would cause a circular dependency.
// Some fields overridden as unknown instead of any to prevent untyped usage.
type AbbreviatedModel = Model<BitDocument> & { statics: unknown, methods: unknown };

const buildFilters = (
  mainChars: string[],
  vsChars: string[],
  stages: string[],
  labels: string[],
) => {
  let resultsFiltered = false;
  const filters: { [key: string]: any } = {};
  if (mainChars.length !== 0) {
    filters.mainChars = { $in: mainChars };
    resultsFiltered = true;
  }
  if (vsChars.length !== 0) {
    filters.vsChars = { $in: vsChars };
    resultsFiltered = true;
  }
  if (stages.length !== 0) {
    filters.stages = { $in: stages };
    resultsFiltered = true;
  }
  if (labels.length !== 0) {
    filters.labels = { $in: labels };
    resultsFiltered = true;
  }
  return resultsFiltered ? filters : null;
};

/** Searches bits table. */
export function queryBits(
  this: AbbreviatedModel,
  sort = SORT_PARAM_DATE,
  offset = 0,
  limit = DEFAULT_PAGE_SIZE,
  mainChars: string[] = [],
  vsChars: string[] = [],
  stages: string[] = [],
  labels: string[] = [],
): Promise<BitDocument[] | null> {
  // Don't expose the DB ID to clients.
  const projectionParams = { _id: 0 };
  let query = this.aggregate().project(projectionParams);

  const filters = buildFilters(mainChars, vsChars, stages, labels);
  query = filters ? query.match(filters) : query;
  let sortParams = {};
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

/** Adds a new bit. */
export function createBit(
  this: AbbreviatedModel,
  bit: Bit,
): Promise<BitDocument> {
  // TODO: Mongo can probably do this for us.
  bit.postId = uuid.v1();
  bit.dateCreated = new Date().getTime();
  return this.create(bit);
}
