import {LabelId, StageId, CharacterId} from '../../types';

export enum SortOption {
  NEWEST,
  OLDEST,
  SCORE,
};

export interface FilteringState {
  sort: SortOption
  mainCharacters: Set<CharacterId>
  vsCharacters: Set<CharacterId>
  stages: Set<StageId>
  offset: number
  limit: number
  labels: Set<LabelId>
  currentPageSize: number
}

export const CHANGE_SORT = 'FILTERING_CHANGE_SORT';
export interface ChangeSortAction {
  type: typeof CHANGE_SORT
  sort: SortOption
}

export const SET_VS_CHARACTERS = 'FILTERING_SET_VS_CHARACTERS';
export interface SetVsCharactersAction {
  type: typeof SET_VS_CHARACTERS
  characters: Set<CharacterId>
}

export const SET_OFFSET = 'FILTERING_SET_OFFSET';
export interface SetOffsetAction {
  type: typeof SET_OFFSET
  offset: number
}

export type FilteringActionTypes = ChangeSortAction | SetVsCharactersAction | SetOffsetAction;
