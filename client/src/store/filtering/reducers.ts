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
  sort: 'score',
  mainCharacters: new Set(),
  vsCharacters: new Set(),
  stages: new Set(),
  offset: 0,
  labels: new Set(),
  currentPageSize: 42,
};

export function filteringReducer(
  state = initialState,
  action: FilteringActionTypes,
): FilteringState {
  switch (action.type) {
    case CHANGE_SORT:
      return { ...state, sort: action.sort };
    case SET_VS_CHARACTERS:
      return { ...state, vsCharacters: action.characters };
    case SET_MAIN_CHARACTERS:
      return { ...state, mainCharacters: action.characters };
    case SET_OFFSET:
      return { ...state, offset: action.offset };
    case SET_STAGES:
      return { ...state, stages: action.stageIds };
    case SET_LABELS:
      return { ...state, labels: action.labels };
    case SET_PAGE_SIZE:
      return { ...state, currentPageSize: action.currentPageSize };
    default:
      return state;
  }
}
