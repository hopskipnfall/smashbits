import { getCharFilters, getStageFilters, getTagFilters, getCharFilterQuery, getStageFilterQuery, getTagFilterQuery } from 'Shared/query_util';
import * as query from 'Shared/query_params';
import URI from 'urijs';
import * as _ from 'lodash';

export const getFilters = queryString => {
  const queryMap = URI(queryString).query(true);
  return {
    ...queryMap[query.QUERY_MAIN_CHARS] && { currentMainChars: getCharFilters(queryMap[query.QUERY_MAIN_CHARS]) },
    ...queryMap[query.QUERY_VS_CHARS] && { currentVsChars: getCharFilters(queryMap[query.QUERY_VS_CHARS]) },
    ...queryMap[query.QUERY_STAGES] && { currentStages: getStageFilters(queryMap[query.QUERY_STAGES]) },
    ...queryMap[query.QUERY_TAGS] && { currentStandaloneTags: getTagFilters(queryMap[query.QUERY_TAGS]) },
  };
};

export const setMainCharsQuery = (chars, queryString) => {
  const filters = { ...getFilters(queryString), currentMainChars: chars };
  const uri = URI().search(displayFiltersToQuery(filters));
  return uri.search();
}

export const toggleMainCharQuery = (char, queryString) => {
  const filters = getFilters(queryString);
  const toggledFilters = _.xor(filters.currentMainChars, [char]);
  const uri = URI().search(displayFiltersToQuery({ ...filters, currentMainChars: toggledFilters }));
  return uri.search();
}

export const setVsCharsQuery = (chars, queryString) => {
  const filters = { ...getFilters(queryString), currentVsChars: chars };
  const uri = URI().search(displayFiltersToQuery(filters));
  return uri.search();
}

export const toggleVsCharQuery = (char, queryString) => {
  const filters = getFilters(queryString);
  const toggledFilters = _.xor(filters.currentVsChars, [char]);
  const uri = URI().search(displayFiltersToQuery({ ...filters, currentVsChars: toggledFilters }));
  return uri.search();
}

export const setStagesQuery = (stages, queryString) => {
  const filters = { ...getFilters(queryString), currentStages: stages };
  const uri = URI().search(displayFiltersToQuery(filters));
  return uri.search();
}

export const toggleStageQuery = (char, queryString) => {
  const filters = getFilters(queryString);
  const toggledFilters = _.xor(filters.currentStages, [char]);
  const uri = URI().search(displayFiltersToQuery({ ...filters, currentStages: toggledFilters }));
  return uri.search();
}

export const setStandaloneTagsQuery = (tags, queryString) => {
  const filters = { ...getFilters(queryString), currentStandaloneTags: tags };
  const uri = URI().search(displayFiltersToQuery(filters));
  return uri.search();
}

export const toggleStandaloneTagQuery = (char, queryString) => {
  const filters = getFilters(queryString);
  const toggledFilters = _.xor(filters.currentStandaloneTags, [char]);
  const uri = URI().search(displayFiltersToQuery({ ...filters, currentStandaloneTags: toggledFilters }));
  return uri.search();
}

const displayFiltersToQuery = filters => _.pickBy({
  ...filters.currentMainChars && { [query.QUERY_MAIN_CHARS]: getCharFilterQuery(filters.currentMainChars) },
  ...filters.currentVsChars && { [query.QUERY_VS_CHARS]: getCharFilterQuery(filters.currentVsChars) },
  ...filters.currentStages && { [query.QUERY_STAGES]: getStageFilterQuery(filters.currentStages) },
  ...filters.currentStandaloneTags && { [query.QUERY_TAGS]: getTagFilterQuery(filters.currentStandaloneTags) },
}, _.identity);