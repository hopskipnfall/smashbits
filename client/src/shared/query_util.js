import * as filters from './filters';

export const getCharFilters = queryString => paramToFilterList(queryString, filters.PARAMS_TO_DISPLAY_CHARS);
export const getStageFilters = queryString => paramToFilterList(queryString, filters.PARAMS_TO_DISPLAY_STAGES);
export const getTagFilters = queryString => paramToFilterList(queryString, filters.PARAMS_TO_DISPLAY_TAGS);

export const getCharFilterQuery = chars => chars.map(char => filters.DISPLAY_TO_PARAMS_CHARS[char]).join(',');
export const getStageFilterQuery = stages => stages.map(stage => filters.DISPLAY_TO_PARAMS_STAGES[stage]).join(',');
export const getTagFilterQuery = tags => tags.map(tag => filters.DISPLAY_TO_PARAMS_TAGS[tag]).join(',');

const paramToFilterList = (queryString, filterMap) => [...new Set(queryString.split(',').map(param => filterMap[param]).filter(Boolean))];
