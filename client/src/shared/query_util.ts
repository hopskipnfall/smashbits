import { CHARACTER_MAP } from '../types';

// function paramToFilterList(query: string, filterMap: { [key: string]: string }) {
//   return Array.from(new Set(query.split(',').map(param => filterMap[param]).filter(Boolean)));
// }

// export const getCharFilters = (query: string) => paramToFilterList(query, filters.PARAMS_TO_DISPLAY_CHARS);
// export const getStageFilters = (query: string) => paramToFilterList(query, filters.PARAMS_TO_DISPLAY_STAGES);
// export const getTagFilters = (query: string) => paramToFilterList(query, filters.PARAMS_TO_DISPLAY_TAGS);

const CHARACTER_MAP_BACKWARDS = new Map(Array.from(CHARACTER_MAP, entry => [entry[1].display, entry[0]]))

export const getCharFilterQuery = (chars: Set<string>) => Array.from(chars).map(char => CHARACTER_MAP_BACKWARDS.get(char)).join(',');
// export const getStageFilterQuery = (stages: string[]) => stages.map(stage => filters.DISPLAY_TO_PARAMS_STAGES[stage]).join(',');
// export const getTagFilterQuery = (tags: string[]) => tags.map(tag => filters.DISPLAY_TO_PARAMS_TAGS[tag]).join(',');
