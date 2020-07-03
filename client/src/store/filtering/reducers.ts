import { FilteringState, SortOption, FilteringActionTypes, CHANGE_SORT, SET_VS_CHARACTERS, SET_OFFSET } from "./types";

const initialState: FilteringState = {
  sort: SortOption.NEWEST,
  mainCharacters: new Set(),
  vsCharacters: new Set(),
  stages: new Set(),
  offset: 0,
  limit: 42,
  labels: new Set(),
  currentPageSize: 42,
}

export function filteringReducer(
  state = initialState,
  action: FilteringActionTypes,
): FilteringState {
  switch(action.type) {
    case CHANGE_SORT:
      return {...state, sort: action.sort}
    case SET_VS_CHARACTERS:
      return {...state, vsCharacters: action.characters}
    case SET_OFFSET:
      return {...state, offset: action.offset}
    default:
      return state;
  }
}
