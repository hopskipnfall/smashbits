import * as URI from 'urijs';
import * as _ from 'lodash';
import { SORT_DATE, SORT_SCORE } from './reducer';
import {
  getCharFilters, getStageFilters, getTagFilters, getCharFilterQuery, getStageFilterQuery, getTagFilterQuery,
} from './shared/query_util';
import * as queryParams from './shared/query_params';

export const PARAM_TO_CLIENT_SORT: {[key: string]: string} = { [queryParams.SORT_PARAM_DATE]: SORT_DATE, [queryParams.SORT_PARAM_SCORE]: SORT_SCORE };
export const CLIENT_SORT_TO_PARAM: {[key: string]: string} = { [SORT_DATE]: queryParams.SORT_PARAM_DATE, [SORT_SCORE]: queryParams.SORT_PARAM_SCORE };

export const getFilters = (queryString: string) => _.pick(
  getDisplayQueryParams(queryString),
  ['currentMainChars', 'currentVsChars', 'currentStages', 'currentStandaloneTags'],
);

const getDisplayQueryParams = (query: string) => {
  const queryMap = URI(query).query(true) as {[key: string]: string};
  return {
    ...queryMap[queryParams.QUERY_SORT] && { currentSort: getSort(query) },
    ...queryMap[queryParams.QUERY_LIMIT] && { currentPageSize: getPageSize(query) },
    ...queryMap[queryParams.QUERY_OFFSET] && { currentOffset: getOffset(query) },
    ...queryMap[queryParams.QUERY_MAIN_CHARS] && { currentMainChars: getCharFilters(queryMap[queryParams.QUERY_MAIN_CHARS]) },
    ...queryMap[queryParams.QUERY_VS_CHARS] && { currentVsChars: getCharFilters(queryMap[queryParams.QUERY_VS_CHARS]) },
    ...queryMap[queryParams.QUERY_STAGES] && { currentStages: getStageFilters(queryMap[queryParams.QUERY_STAGES]) },
    ...queryMap[queryParams.QUERY_TAGS] && { currentStandaloneTags: getTagFilters(queryMap[queryParams.QUERY_TAGS]) },
  };
};

export const getSort = (query: string) => PARAM_TO_CLIENT_SORT[(URI(query).query(true) as {[key: string]: string})[queryParams.QUERY_SORT]];

export const getPageSize = (query: string) => parseInt((URI(query).query(true) as {[key: string]: string})[queryParams.QUERY_LIMIT], 10);

export const getOffset = (query: string) => parseInt((URI(query).query(true) as {[key: string]: string})[queryParams.QUERY_OFFSET], 10);

export const setSortQuery = (sort: string, queryString: string) => setQueryParam('currentSort', sort, queryString);

export const setPageSizeQuery = (pageSize: number, queryString: string) => setQueryParam('currentPageSize', pageSize, queryString);

export const setOffsetQuery = (offset: number, queryString: string) => setQueryParam('currentOffset', offset, queryString);

export const setMainCharsQuery = (chars: string[], queryString: string) => setQueryParam('currentMainChars', chars, queryString);

export const toggleMainCharQuery = (char: string, queryString: string) => {
  const params = getDisplayQueryParams(queryString);
  const toggledFilters = _.xor(params.currentMainChars, [char]);
  return setMainCharsQuery(toggledFilters, queryString);
};

export const setVsCharsQuery = (chars: string[], queryString: string) => setQueryParam('currentVsChars', chars, queryString);

export const toggleVsCharQuery = (char: string, queryString: string) => {
  const params = getDisplayQueryParams(queryString);
  const toggledFilters = _.xor(params.currentVsChars, [char]);
  return setVsCharsQuery(toggledFilters, queryString);
};

export const setStagesQuery = (stages: string[], queryString: string) => setQueryParam('currentStages', stages, queryString);

export const toggleStageQuery = (char: string, queryString: string) => {
  const params = getDisplayQueryParams(queryString);
  const toggledFilters = _.xor(params.currentStages, [char]);
  return setStagesQuery(toggledFilters, queryString);
};

export const setStandaloneTagsQuery = (tags: string[], queryString: string) => setQueryParam('currentStandaloneTags', tags, queryString);

export const toggleStandaloneTagQuery = (char: string, queryString: string) => {
  const params = getDisplayQueryParams(queryString);
  const toggledFilters = _.xor(params.currentStandaloneTags, [char]);
  return setStandaloneTagsQuery(toggledFilters, queryString);
};

const setQueryParam = (key: string, value: any, queryString: string) => {
  const params = { ...getDisplayQueryParams(queryString), [key]: value };
  const uri = URI().search(displayParamsToQuery(params));
  return uri.search();
};

const displayParamsToQuery = (params: {[key: string]: any}) => _.pickBy({
  ...params.currentSort && { [queryParams.QUERY_SORT]: CLIENT_SORT_TO_PARAM[params.currentSort] },
  ...params.currentPageSize && { [queryParams.QUERY_LIMIT]: params.currentPageSize },
  ...params.currentOffset && { [queryParams.QUERY_OFFSET]: params.currentOffset },
  ...params.currentMainChars && { [queryParams.QUERY_MAIN_CHARS]: getCharFilterQuery(params.currentMainChars) },
  ...params.currentVsChars && { [queryParams.QUERY_VS_CHARS]: getCharFilterQuery(params.currentVsChars) },
  ...params.currentStages && { [queryParams.QUERY_STAGES]: getStageFilterQuery(params.currentStages) },
  ...params.currentStandaloneTags && { [queryParams.QUERY_TAGS]: getTagFilterQuery(params.currentStandaloneTags) },
}, _.identity);