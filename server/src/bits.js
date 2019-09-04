import jsStringEscape from 'js-string-escape';
import { queryBit, queryBits, putBit, queryComments, SORT_DATE, SORT_SCORE } from './store';

const SORTS = [SORT_DATE, SORT_SCORE];

export function getBit(req) {
  return queryBit({ bitId: req.params.bitId })
}

export function getBits(req) {
  var limit = parseInt(jsStringEscape(req.query.limit));
  var offset = parseInt(jsStringEscape(req.query.offset));
  return queryBits({
      sort: paramToSort(req.query.sort),
      ...limit && { limit: limit },
      ...offset && { offset: offset },
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
      ...(bit.tags ? { tags: jsStringEscape(bit.tags.join()) } : {}),
      ...(bit.stages ? { stages: jsStringEscape(bit.stages.join()) } : {}),
      ...(bit.mainChars ? { main_chars: jsStringEscape(bit.mainChars.join()) } : {}),
      ...(bit.vsChars ? { vs_chars: jsStringEscape(bit.vsChars.join()) } : {})
    })
}

export function getComments(reqParams) {
  return queryComments(reqParams.bitId);
}

const normalize = string => string.trim().toLowerCase();

const paramToSort = param => paramToSymbol(param, SORTS, SORT_DATE);

const paramToSymbol = (param, allowedSymbols, defaultValue) => {
  const symbol = Symbol.for(normalize(jsStringEscape(param)));
  return allowedSymbols.includes(symbol) ? symbol : defaultValue;
}