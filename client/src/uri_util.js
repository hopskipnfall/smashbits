import { SORT_DATE, SORT_SCORE } from './reducer';
import { getCharFilters, getStageFilters, getTagFilters, getCharFilterQuery, getStageFilterQuery, getTagFilterQuery } from 'Shared/query_util';
import * as query from 'Shared/query_params';
import URI from 'urijs';
import * as _ from 'lodash';

export const PARAM_TO_CLIENT_SORT = { [query.SORT_PARAM_DATE]: SORT_DATE, [query.SORT_PARAM_SCORE]: SORT_SCORE };
export const CLIENT_SORT_TO_PARAM = { [SORT_DATE]: query.SORT_PARAM_DATE, [SORT_SCORE]: query.SORT_PARAM_SCORE };

export const getFilters = queryString => _.pick(
    getDisplayQueryParams(queryString),
    ['currentMainChars', 'currentVsChars', 'currentStages', 'currentStandaloneTags']
);

const getDisplayQueryParams = queryString => {
  const queryMap = URI(queryString).query(true);
  return {
    ...queryMap[query.QUERY_SORT] && { currentSort: getSort(queryString) },
    ...queryMap[query.QUERY_LIMIT] && { currentPageSize: getPageSize(queryString) },
    ...queryMap[query.QUERY_OFFSET] && { currentOffset: getOffset(queryString) },
    ...queryMap[query.QUERY_MAIN_CHARS] && { currentMainChars: getCharFilters(queryMap[query.QUERY_MAIN_CHARS]) },
    ...queryMap[query.QUERY_VS_CHARS] && { currentVsChars: getCharFilters(queryMap[query.QUERY_VS_CHARS]) },
    ...queryMap[query.QUERY_STAGES] && { currentStages: getStageFilters(queryMap[query.QUERY_STAGES]) },
    ...queryMap[query.QUERY_TAGS] && { currentStandaloneTags: getTagFilters(queryMap[query.QUERY_TAGS]) },
  };
};

export const getSort = queryString => {
  return PARAM_TO_CLIENT_SORT[URI(queryString).query(true)[query.QUERY_SORT]];
};

export const getPageSize = queryString => {
  return parseInt(URI(queryString).query(true)[query.QUERY_LIMIT], 10);
};

export const getOffset = queryString => {
  return parseInt(URI(queryString).query(true)[query.QUERY_OFFSET], 10);
};

export const setSortQuery = (sort, queryString) => {
  return setQueryParam('currentSort', sort, queryString);
}

export const setPageSizeQuery = (pageSize, queryString) => {
  return setQueryParam('currentPageSize', pageSize, queryString);
}

export const setOffsetQuery = (offset, queryString) => {
  return setQueryParam('currentOffset', offset, queryString);
}

export const setMainCharsQuery = (chars, queryString) => {
  return setQueryParam('currentMainChars', chars, queryString);
}

export const toggleMainCharQuery = (char, queryString) => {
  const params = getDisplayQueryParams(queryString);
  const toggledFilters = _.xor(params.currentMainChars, [char]);
  return setMainCharsQuery(toggledFilters, queryString);
}

export const setVsCharsQuery = (chars, queryString) => {
  return setQueryParam('currentVsChars', chars, queryString);
}

export const toggleVsCharQuery = (char, queryString) => {
  const params = getDisplayQueryParams(queryString);
  const toggledFilters = _.xor(params.currentVsChars, [char]);
  return setVsCharsQuery(toggledFilters, queryString);
}

export const setStagesQuery = (stages, queryString) => {
  return setQueryParam('currentStages', stages, queryString);
}

export const toggleStageQuery = (char, queryString) => {
  const params = getDisplayQueryParams(queryString);
  const toggledFilters = _.xor(params.currentStages, [char]);
  return setStagesQuery(toggledFilters, queryString);
}

export const setStandaloneTagsQuery = (tags, queryString) => {
  return setQueryParam('currentStandaloneTags', tags, queryString);
}

export const toggleStandaloneTagQuery = (char, queryString) => {
  const params = getDisplayQueryParams(queryString);
  const toggledFilters = _.xor(params.currentStandaloneTags, [char]);
  return setStandaloneTagsQuery(toggledFilters, queryString);
}

const setQueryParam = (key, value, queryString) => {
  const params = { ...getDisplayQueryParams(queryString), [key]: value };
  const uri = URI().search(displayParamsToQuery(params));
  return uri.search();
}

const displayParamsToQuery = params => _.pickBy({
  ...params.currentSort && { [query.QUERY_SORT]: CLIENT_SORT_TO_PARAM[params.currentSort] },
  ...params.currentPageSize && { [query.QUERY_LIMIT]: params.currentPageSize },
  ...params.currentOffset && { [query.QUERY_OFFSET]: params.currentOffset },
  ...params.currentMainChars && { [query.QUERY_MAIN_CHARS]: getCharFilterQuery(params.currentMainChars) },
  ...params.currentVsChars && { [query.QUERY_VS_CHARS]: getCharFilterQuery(params.currentVsChars) },
  ...params.currentStages && { [query.QUERY_STAGES]: getStageFilterQuery(params.currentStages) },
  ...params.currentStandaloneTags && { [query.QUERY_TAGS]: getTagFilterQuery(params.currentStandaloneTags) },
}, _.identity);