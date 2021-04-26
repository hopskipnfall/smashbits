import jsStringEscape from 'js-string-escape';
import { BitsModel } from './db/bits/bits.schema';
import * as query from './shared/query_params';
import {
  getCharFilters,
  getStageFilters,
  getTagFilters,
} from './shared/query_util';

const SORTS = [
  query.SORT_PARAM_NEWEST,
  query.SORT_PARAM_OLDEST,
  query.SORT_PARAM_SCORE,
];

export function getBit(req) {
  return BitsModel.findOne({ postId: req.params.bitId });
}

const normalize = (string) => string.trim().toLowerCase();

const paramToSort = (param) => {
  const normalized = normalize(jsStringEscape(param));
  return SORTS.includes(normalized) ? normalized : query.SORT_PARAM_NEWEST;
};

export function getBits(req) {
  // TODO: Clean this stuff up.... jsStringEscape returns the string "undefined" for undefined etc.
  let limit = Number(jsStringEscape(req.query[query.QUERY_LIMIT] || 0));
  if (!limit) {
    limit = undefined;
  }
  const offset = Number(jsStringEscape(req.query[query.QUERY_OFFSET] || 0));
  const mainChars = getCharFilters(
    jsStringEscape(req.query[query.QUERY_MAIN_CHARS] || ''),
  );
  const vsChars = getCharFilters(
    jsStringEscape(req.query[query.QUERY_VS_CHARS] || ''),
  );
  const stages = getStageFilters(
    jsStringEscape(req.query[query.QUERY_STAGES] || ''),
  );
  const standaloneTags = getTagFilters(
    jsStringEscape(req.query[query.QUERY_TAGS] || ''),
  );

  return BitsModel.queryBits(
    paramToSort(req.query[query.QUERY_SORT]),
    offset,
    limit,
    mainChars,
    vsChars,
    stages,
    standaloneTags,
  );
}

export function createBit({ bit, author } = {}) {
  return BitsModel.createBit({
    author: {
      name: jsStringEscape(author.twitterProfile.get('displayName')),
      personId: jsStringEscape(author.id),
    },
    title: jsStringEscape(bit.title),
    content: jsStringEscape(bit.content),
    ...(bit.media
      ? { media: bit.media.map((media) => escapeMedia(media)) }
      : {}),
    ...(bit.tags ? { tags: bit.tags.map((tag) => jsStringEscape(tag)) } : {}),
    ...(bit.stages
      ? { stages: bit.stages.map((stage) => jsStringEscape(stage)) }
      : {}),
    ...(bit.mainChars
      ? { mainChars: bit.mainChars.map((char) => jsStringEscape(char)) }
      : {}),
    ...(bit.vsChars
      ? { vsChars: bit.vsChars.map((char) => jsStringEscape(char)) }
      : {}),
  });
}

const escapeMedia = (singleMedia) => ({
  ...singleMedia,
  uri: jsStringEscape(singleMedia.uri),
});

export function getComments(reqParams) {
  // return queryComments(reqParams.bitId);
}
