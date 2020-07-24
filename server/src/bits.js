import * as jsStringEscape from 'js-string-escape';
import * as query from './shared/query_params';
import { getCharFilters, getStageFilters, getTagFilters } from './shared/query_util';
import { BitsModel } from './db/bits/bits.model';
// import {
//   queryBit, queryBits, putBit, queryComments,
// } from './store';

const SORTS = [query.SORT_PARAM_DATE, query.SORT_PARAM_SCORE];

export function getBit(req) {
  return BitsModel.find({ bitId: req.params.bitId });

  // return queryBit({ bitId: req.params.bitId });
}

export function getBits(req) {
  const limit = parseInt(jsStringEscape(req.query[query.QUERY_LIMIT] || ''));
  const offset = parseInt(jsStringEscape(req.query[query.QUERY_OFFSET] || ''));
  const mainChars = getCharFilters(jsStringEscape(req.query[query.QUERY_MAIN_CHARS] || ''));
  const vsChars = getCharFilters(jsStringEscape(req.query[query.QUERY_VS_CHARS] || ''));
  const stages = getStageFilters(jsStringEscape(req.query[query.QUERY_STAGES] || ''));
  const standaloneTags = getTagFilters(jsStringEscape(req.query[query.QUERY_TAGS] || ''));
  // return queryBits();

  return BitsModel.queryBits(
    paramToSort(req.query[query.QUERY_SORT]),
    limit,
    offset,
    mainChars,
    vsChars,
    stages,
    standaloneTags,
  );
}

export function createBit({ bit, author } = {}) {
  // return putBit({
  //   author: {
  //     name: jsStringEscape(author.twitterProfile.get('displayName')),
  //     personId: jsStringEscape(author.id),
  //   },
  //   title: jsStringEscape(bit.title),
  //   content: jsStringEscape(bit.content),
  //   ...(bit.tags ? { tags: bit.tags.map(tag => jsStringEscape(tag)) } : {}),
  //   ...(bit.stages ? { stages: bit.stages.map(stage => jsStringEscape(stage)) } : {}),
  //   ...(bit.mainChars ? { mainChars: bit.mainChars.map(char => jsStringEscape(char)) } : {}),
  //   ...(bit.vsChars ? { vsChars: bit.vsChars.map(char => jsStringEscape(char)) } : {}),
  // });
}

export function getComments(reqParams) {
  // return queryComments(reqParams.bitId);
}

const normalize = string => string.trim().toLowerCase();

const paramToSort = param => {
  const normalized = normalize(jsStringEscape(param));
  return SORTS.includes(normalized) ? normalized : query.SORT_PARAM_DATE;
};
