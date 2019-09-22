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

export const getDisplayQueryParams = queryString => {
  const queryMap = URI(queryString).query(true);
  return {
    ...queryMap[query.QUERY_SORT] && { currentSort: getSort(queryString) },
    ...queryMap[query.QUERY_MAIN_CHARS] && { currentMainChars: getCharFilters(queryMap[query.QUERY_MAIN_CHARS]) },
    ...queryMap[query.QUERY_VS_CHARS] && { currentVsChars: getCharFilters(queryMap[query.QUERY_VS_CHARS]) },
    ...queryMap[query.QUERY_STAGES] && { currentStages: getStageFilters(queryMap[query.QUERY_STAGES]) },
    ...queryMap[query.QUERY_TAGS] && { currentStandaloneTags: getTagFilters(queryMap[query.QUERY_TAGS]) },
  };
};

export const getSort = queryString => {
  return PARAM_TO_CLIENT_SORT[URI(queryString).query(true)[query.QUERY_SORT]];
};

export const setSortQuery = (sort, queryString) => {
  const params = { ...getDisplayQueryParams(queryString), currentSort: sort };
  const uri = URI().search(displayParamsToQuery(params));
  return uri.search();
}

export const setMainCharsQuery = (chars, queryString) => {
  const params = { ...getDisplayQueryParams(queryString), currentMainChars: chars };
  const uri = URI().search(displayParamsToQuery(params));
  return uri.search();
}

export const toggleMainCharQuery = (char, queryString) => {
  const params = getDisplayQueryParams(queryString);
  const toggledFilters = _.xor(params.currentMainChars, [char]);
  const uri = URI().search(displayParamsToQuery({ ...params, currentMainChars: toggledFilters }));
  return uri.search();
}

export const setVsCharsQuery = (chars, queryString) => {
  const params = { ...getDisplayQueryParams(queryString), currentVsChars: chars };
  const uri = URI().search(displayParamsToQuery(params));
  return uri.search();
}

export const toggleVsCharQuery = (char, queryString) => {
  const params = getDisplayQueryParams(queryString);
  const toggledFilters = _.xor(params.currentVsChars, [char]);
  const uri = URI().search(displayParamsToQuery({ ...params, currentVsChars: toggledFilters }));
  return uri.search();
}

export const setStagesQuery = (stages, queryString) => {
  const params = { ...getDisplayQueryParams(queryString), currentStages: stages };
  const uri = URI().search(displayParamsToQuery(params));
  return uri.search();
}

export const toggleStageQuery = (char, queryString) => {
  const params = getDisplayQueryParams(queryString);
  const toggledFilters = _.xor(params.currentStages, [char]);
  const uri = URI().search(displayParamsToQuery({ ...params, currentStages: toggledFilters }));
  return uri.search();
}

export const setStandaloneTagsQuery = (tags, queryString) => {
  const params = { ...getDisplayQueryParams(queryString), currentStandaloneTags: tags };
  const uri = URI().search(displayParamsToQuery(params));
  return uri.search();
}

export const toggleStandaloneTagQuery = (char, queryString) => {
  const params = getDisplayQueryParams(queryString);
  const toggledFilters = _.xor(params.currentStandaloneTags, [char]);
  const uri = URI().search(displayParamsToQuery({ ...params, currentStandaloneTags: toggledFilters }));
  return uri.search();
}

const displayParamsToQuery = params => _.pickBy({
  ...params.currentSort && { [query.QUERY_SORT]: CLIENT_SORT_TO_PARAM[params.currentSort] },
  ...params.currentMainChars && { [query.QUERY_MAIN_CHARS]: getCharFilterQuery(params.currentMainChars) },
  ...params.currentVsChars && { [query.QUERY_VS_CHARS]: getCharFilterQuery(params.currentVsChars) },
  ...params.currentStages && { [query.QUERY_STAGES]: getStageFilterQuery(params.currentStages) },
  ...params.currentStandaloneTags && { [query.QUERY_TAGS]: getTagFilterQuery(params.currentStandaloneTags) },
}, _.identity);