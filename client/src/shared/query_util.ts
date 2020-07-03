// import * as filters from './filters';

// function paramToFilterList(query: string, filterMap: { [key: string]: string }) {
//   return Array.from(new Set(query.split(',').map(param => filterMap[param]).filter(Boolean)));
// }

// export const getCharFilters = (query: string) => paramToFilterList(query, filters.PARAMS_TO_DISPLAY_CHARS);
// export const getStageFilters = (query: string) => paramToFilterList(query, filters.PARAMS_TO_DISPLAY_STAGES);
// export const getTagFilters = (query: string) => paramToFilterList(query, filters.PARAMS_TO_DISPLAY_TAGS);

// export const getCharFilterQuery = (chars: string[]) => chars.map(char => filters.DISPLAY_TO_PARAMS_CHARS[char]).join(',');
// export const getStageFilterQuery = (stages: string[]) => stages.map(stage => filters.DISPLAY_TO_PARAMS_STAGES[stage]).join(',');
// export const getTagFilterQuery = (tags: string[]) => tags.map(tag => filters.DISPLAY_TO_PARAMS_TAGS[tag]).join(',');
