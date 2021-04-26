import { DEFAULT_PAGE_SIZE, DEFAULT_SORT } from '../../types';
import {
  CHANGE_SORT,
  FilteringActionTypes,
  FilteringState,
  SET_LABELS,
  SET_MAIN_CHARACTERS,
  SET_OFFSET,
  SET_PAGE_SIZE,
  SET_STAGES,
  SET_VS_CHARACTERS,
} from './types';

const initialState: FilteringState = {
  sort: DEFAULT_SORT,
  mainCharacters: new Set(),
  vsCharacters: new Set(),
  stages: new Set(),
  offset: 0,
  labels: new Set(),
  currentPageSize: DEFAULT_PAGE_SIZE,
};

export function filteringReducer(
  state = initialState,
  action: FilteringActionTypes,
): FilteringState {
  switch (action.type) {
    case CHANGE_SORT:
      return { ...state, ...(action.sort && { sort: action.sort }) };
    case SET_VS_CHARACTERS:
      return {
        ...state,
        ...(action.characters && { vsCharacters: action.characters }),
      };
    case SET_MAIN_CHARACTERS:
      return {
        ...state,
        ...(action.characters && { mainCharacters: action.characters }),
      };
    case SET_OFFSET:
      return { ...state, ...{ offset: action.offset } };
    case SET_STAGES:
      return { ...state, ...(action.stageIds && { stages: action.stageIds }) };
    case SET_LABELS:
      return { ...state, ...(action.labels && { labels: action.labels }) };
    case SET_PAGE_SIZE:
      return {
        ...state,
        ...(action.currentPageSize && {
          currentPageSize: action.currentPageSize,
        }),
      };
    default:
      return state;
  }
}
