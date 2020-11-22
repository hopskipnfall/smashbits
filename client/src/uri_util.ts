// import * as Immutable from 'immutable';
// import * as _ from 'lodash';
import * as URI from 'urijs';
import {
  QUERY_LIMIT,
  QUERY_MAIN_CHARS,
  QUERY_OFFSET,
  QUERY_SORT,
  QUERY_STAGES,
  QUERY_TAGS,
  QUERY_VS_CHARS,
} from './shared/query_params';
// // import { SORT_DATE, SORT_SCORE } from './reducer';
// import * as queryParams from './shared/query_params';
import { AppState } from './store';
import { CHARACTER_MAP, LABEL_MAP, STAGE_MAP } from './types';

// export const PARAM_TO_CLIENT_SORT: { [key: string]: string } = { [queryParams.SORT_PARAM_DATE]: SORT_DATE, [queryParams.SORT_PARAM_SCORE]: SORT_SCORE };
// export const CLIENT_SORT_TO_PARAM: { [key: string]: string } = { [SORT_DATE]: queryParams.SORT_PARAM_DATE, [SORT_SCORE]: queryParams.SORT_PARAM_SCORE };

export const getDisplayQueryParams = (query: string) => {
  const queryMap = URI(query).query(true) as { [key: string]: string };
  return {
    ...(queryMap[QUERY_SORT] && { sort: getSort(query) }),
    ...(queryMap[QUERY_LIMIT] && { pageSize: getPageSize(query) }),
    ...(queryMap[QUERY_OFFSET] && { offset: getOffset(query) }),
    ...(queryMap[QUERY_MAIN_CHARS] && { mainChars: getMainCharFilters(query) }),
    ...(queryMap[QUERY_VS_CHARS] && { vsChars: getVsCharFilters(query) }),
    ...(queryMap[QUERY_STAGES] && { stages: getStageFilters(query) }),
    ...(queryMap[QUERY_TAGS] && { standaloneTags: getTagFilters(query) }),
  };
};

const queryStringToObject = (query: string) =>
  URI(query).query(true) as { [key: string]: string };

const paramStringToFilters = <V>(param: string, filterMap: Map<string, V>) =>
  new Set(
    param
      ?.split(',')
      .map((id) => filterMap.get(id))
      .filter(isPresent),
  );

const getMainCharFilters = (query: string) =>
  paramStringToFilters(
    queryStringToObject(query)[QUERY_MAIN_CHARS],
    CHARACTER_MAP,
  );

const getVsCharFilters = (query: string) =>
  paramStringToFilters(
    queryStringToObject(query)[QUERY_VS_CHARS],
    CHARACTER_MAP,
  );

const getStageFilters = (query: string) =>
  paramStringToFilters(queryStringToObject(query)[QUERY_STAGES], STAGE_MAP);

const getTagFilters = (query: string) =>
  paramStringToFilters(queryStringToObject(query)[QUERY_TAGS], LABEL_MAP);

const getSort = (query: string) => queryStringToObject(query)[QUERY_SORT];

export const getPageSize = (query: string) =>
  parseInt(queryStringToObject(query)[QUERY_LIMIT], /*radix=*/ 10);

export const getOffset = (query: string) =>
  parseInt(queryStringToObject(query)[QUERY_OFFSET], /*radix=*/ 10);

// export const setSortQuery = (sort: string, queryString: string) => setQueryParam('currentSort', sort, queryString);

// export const setPageSizeQuery = (pageSize: number, queryString: string) => setQueryParam('currentPageSize', pageSize, queryString);

// export const setOffsetQuery = (offset: number, queryString: string) => setQueryParam('currentOffset', offset, queryString);

// export const setMainCharsQuery = (chars: Immutable.Set<string>, queryString: string) => setQueryParam('currentMainChars', chars, queryString);

// export const toggleMainCharQuery = (char: string, queryString: string) => {
//   const params = getDisplayQueryParams(queryString);
//   const toggledFilters = Immutable.Set(_.xor(params.currentMainChars, [char]));
//   return setMainCharsQuery(toggledFilters, queryString);
// };

// export const setVsCharsQuery = (chars: Immutable.Set<string>, queryString: string) => setQueryParam('currentVsChars', chars, queryString);

// export const toggleVsCharQuery = (char: string, queryString: string) => {
//   const params = getDisplayQueryParams(queryString);
//   const toggledFilters = Immutable.Set(_.xor(params.currentVsChars, [char]));
//   return setVsCharsQuery(toggledFilters, queryString);
// };

// export const setStagesQuery = (stages: Immutable.Set<string>, queryString: string) => setQueryParam('currentStages', stages, queryString);

// export const toggleStageQuery = (char: string, queryString: string) => {
//   const params = getDisplayQueryParams(queryString);
//   const toggledFilters = Immutable.Set(_.xor(params.currentStages, [char]));
//   return setStagesQuery(toggledFilters, queryString);
// };

// export const setStandaloneTagsQuery = (tags: Immutable.Set<string>, queryString: string) => setQueryParam('currentStandaloneTags', tags, queryString);

// export const toggleStandaloneTagQuery = (char: string, queryString: string) => {
//   const params = getDisplayQueryParams(queryString);
//   const toggledFilters = Immutable.Set(_.xor(params.currentStandaloneTags, [char]));
//   return setStandaloneTagsQuery(toggledFilters, queryString);
// };

// const setQueryParam = (key: string, value: any, queryString: string) => {
//   const params = { ...getDisplayQueryParams(queryString), [key]: value };
//   const uri = URI().search(displayParamsToQuery(params));
//   return uri.search();
// };

// const displayParamsToQuery = (state: AppState) => _.pickBy({
//   ...params.currentSort && { [queryParams.QUERY_SORT]: CLIENT_SORT_TO_PARAM[params.currentSort] },
//   ...params.currentPageSize && { [queryParams.QUERY_LIMIT]: params.currentPageSize },
//   ...params.currentOffset && { [queryParams.QUERY_OFFSET]: params.currentOffset },
//   ...params.currentMainChars && { [queryParams.QUERY_MAIN_CHARS]: getCharFilterQuery(params.currentMainChars) },
//   ...params.currentVsChars && { [queryParams.QUERY_VS_CHARS]: getCharFilterQuery(params.currentVsChars) },
//   ...params.currentStages && { [queryParams.QUERY_STAGES]: getStageFilterQuery(params.currentStages) },
//   ...params.currentStandaloneTags && { [queryParams.QUERY_TAGS]: getTagFilterQuery(params.currentStandaloneTags) },
// }, _.identity);

const isPresent = <T>(t: T | undefined | null | void): t is T =>
  t !== undefined && t !== null;

const defaultToUndefined = (param: any) => {
  // if (param instanceof Set) {
  //   return param.size > 0 ? param : undefined;
  // }
  // eslint-disable-next-line no-unneeded-ternary
  return param ? param : undefined;
};

export const buildUriFromState = (state: AppState) => {
  const params = {
    [QUERY_SORT]: defaultToUndefined(state.filtering.sort),
    [QUERY_OFFSET]: defaultToUndefined(state.filtering.offset),
    [QUERY_MAIN_CHARS]: defaultToUndefined(
      Array.from(state.filtering.mainCharacters)
        .map((char) => char.id)
        .join(','),
    ),
    [QUERY_VS_CHARS]: defaultToUndefined(
      Array.from(state.filtering.vsCharacters)
        .map((char) => char.id)
        .join(','),
    ),
    [QUERY_STAGES]: defaultToUndefined(
      Array.from(state.filtering.stages)
        .map((stage) => stage.id)
        .join(','),
    ),
    [QUERY_TAGS]: defaultToUndefined(
      Array.from(state.filtering.labels)
        .map((label) => label.id)
        .join(','),
    ),
    [QUERY_LIMIT]: defaultToUndefined(state.filtering.currentPageSize),
  };

  const uri = URI().search(params);
  return uri.search();
};
