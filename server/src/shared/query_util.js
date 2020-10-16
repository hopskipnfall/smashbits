import * as params from './query_params';

const paramToFilterList = (queryString, filterAllowList) => {
  if (!queryString || queryString === 'undefined') {
    return [];
  }
  return Array.from(filterAllowList).filter((v) =>
    queryString.split(',').includes(v),
  );
};

export const getCharFilters = (queryString) =>
  paramToFilterList(queryString, params.CHAR_FILTERS);
export const getStageFilters = (queryString) =>
  paramToFilterList(queryString, params.STAGE_FILTERS);
export const getTagFilters = (queryString) =>
  paramToFilterList(queryString, params.TAG_FILTERS);
