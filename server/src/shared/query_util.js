import * as params from './query_params';

export const getCharFilters = queryString => paramToFilterList(queryString, params.CHAR_FILTERS);
export const getStageFilters = queryString => paramToFilterList(queryString, params.STAGE_FILTERS);
export const getTagFilters = queryString => paramToFilterList(queryString, params.TAG_FILTERS);

const paramToFilterList = (queryString, filterAllowList) => {
  if (!queryString || queryString === 'undefined') {
    return [];
  }

  return [...new Set(queryString.split(',').filter(param => filterAllowList.has(param)))];
};
