import jsStringEscape from 'js-string-escape';
import { queryBit, queryBits, putBit, queryComments } from './store';
import * as filters from 'Shared/filters';
import * as query from 'Shared/query_params';

const SORTS = [query.SORT_PARAM_DATE, query.SORT_PARAM_SCORE];

export function getBit(req) {
  return queryBit({ bitId: req.params.bitId })
}

export function getBits(req) {
  const limit = parseInt(jsStringEscape(req.query[query.QUERY_LIMIT]));
  const offset = parseInt(jsStringEscape(req.query[query.QUERY_OFFSET]));
  const mainChars = paramToFilterList(jsStringEscape(req.query[query.QUERY_MAIN_CHARS]), filters.PARAMS_TO_DISPLAY_CHARS);
  const vsChars = paramToFilterList(jsStringEscape(req.query[query.QUERY_VS_CHARS]), filters.PARAMS_TO_DISPLAY_CHARS);
  const stages = paramToFilterList(jsStringEscape(req.query[query.QUERY_STAGES]), filters.PARAMS_TO_DISPLAY_STAGES);
  const standaloneTags = paramToFilterList(jsStringEscape(req.query[query.QUERY_TAGS]), filters.PARAMS_TO_DISPLAY_TAGS);
  return queryBits({
      sort: paramToSort(req.query[query.QUERY_SORT]),
      ...limit && { limit: limit },
      ...offset && { offset: offset },
      ...mainChars.length && { mainChars: mainChars },
      ...vsChars.length && { vsChars: vsChars },
      ...stages.length && { stages: stages },
      ...standaloneTags.length && { standaloneTags: standaloneTags },
    });
}

export function createBit(bit) {
  return putBit({
      author: {
        name: jsStringEscape(bit.author.name),
        personId: jsStringEscape(bit.author.person_id)
      },
      title: jsStringEscape(bit.title),
      content: jsStringEscape(bit.content),
      ...(bit.tags ? { tags: bit.tags.map(tag => jsStringEscape(tag)) } : {}),
      ...(bit.stages ? { stages: bit.stages.map(stage => jsStringEscape(stage)) } : {}),
      ...(bit.mainChars ? { mainChars: bit.mainChars.map(char => jsStringEscape(char)) } : {}),
      ...(bit.vsChars ? { vsChars: bit.vsChars.map(char => jsStringEscape(char)) } : {})
    })
}

export function getComments(reqParams) {
  return queryComments(reqParams.bitId);
}

const normalize = string => string.trim().toLowerCase();

const paramToSort = param => {
  const normalized = normalize(jsStringEscape(param));
  return SORTS.includes(normalized) ? normalized : query.SORT_PARAM_DATE;
};

const paramToFilterList = (jsonString, filterMap) =>
  jsonString.split(',').map(param => filterMap[param]).filter(Boolean);
