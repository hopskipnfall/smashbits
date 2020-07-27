/**
 * "Static" methods on the table.
 * @packageDocumentation
 */

import { SORT_PARAM_DATE, SORT_PARAM_SCORE } from '../../shared/query_params';
import { BitDocument } from './bits.schema';
import { Model } from 'mongoose';

const DEFAULT_PAGE_SIZE = 25;

// Not using BitModel here as that would cause a circular dependency.
// Statics is marked as unknown instead of any to prevent untyped usage.
type AbbreviatedModel = Model<BitDocument> & { statics: unknown, methods: unknown };

export function queryBits(
  this: AbbreviatedModel,
  sort = SORT_PARAM_DATE,
  offset = 0,
  limit = DEFAULT_PAGE_SIZE,
  mainChars,
  vsChars,
  stages,
  standaloneTags)
  : Promise<BitDocument[] | null> {
  mainChars = mainChars.length === 0 ? undefined : mainChars;
  vsChars = vsChars.length === 0 ? undefined : vsChars;
  stages = stages.length === 0 ? undefined : stages;
  standaloneTags = standaloneTags.length === 0 ? undefined : standaloneTags;

  // Don't expose the DB ID to clients.
  const projectionParams = { _id: 0 };
  let sortParams = {};
  const filters = {
    ...(mainChars && { mainChars: { $in: mainChars } }),
    ...(vsChars && { vsChars: { $in: vsChars } }),
    ...(stages && { stages: { $in: stages } }),
    ...(standaloneTags && { tags: { $in: standaloneTags } }),
  };
  let query = this.aggregate().project(projectionParams);
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
};
