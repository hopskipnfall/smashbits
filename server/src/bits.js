import jsStringEscape from 'js-string-escape';
import { queryBits, putBit, queryComments, SORT_DATE, SORT_SCORE } from './store';

const SORTS = [SORT_DATE, SORT_SCORE];

export function getBits(req) {
  return queryBits({ sort: paramToSort(req.query.sort) });
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