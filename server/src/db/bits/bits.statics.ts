import {BitModel} from './bits.types';
import { BitDocument } from './bits.types';
import { SORT_PARAM_DATE, SORT_PARAM_SCORE } from '../../shared/query_params';

const DEFAULT_PAGE_SIZE = 25;

export function queryBits(
  this: BitModel,
  sort,// = SORT_PARAM_DATE,
  offset = 0,
  limit,// = DEFAULT_PAGE_SIZE,
  mainChars,
  vsChars,
  stages,
  standaloneTags)
: Promise<BitDocument[] | null> {

  mainChars = mainChars.length === 0 ? undefined : mainChars;
  vsChars = vsChars.length === 0 ? undefined : vsChars;
  stages = stages.length === 0 ? undefined : stages;
  standaloneTags = standaloneTags.length === 0 ? undefined : standaloneTags;
  
  sort = sort || SORT_PARAM_DATE;
  limit = limit || DEFAULT_PAGE_SIZE;
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
}
