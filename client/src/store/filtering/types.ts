import { LabelId, StageId, CharacterId, SortOption, PageSize } from '../../types';

export interface FilteringState {
  sort: SortOption
  mainCharacters: Set<string> // TODO make this ids lol.
  vsCharacters: Set<string>
  stages: Set<StageId>
  offset: number
  limit: number
  labels: Set<LabelId>
  currentPageSize: PageSize
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

export const SET_MAIN_CHARACTERS = 'FILTERING_SET_MAIN_CHARACTERS';
export interface SetMainCharactersAction {
  type: typeof SET_MAIN_CHARACTERS
  characters: Set<CharacterId>
}

export const SET_OFFSET = 'FILTERING_SET_OFFSET';
export interface SetOffsetAction {
  type: typeof SET_OFFSET
  offset: number
}

export const SET_STAGES = 'FILTERING_SET_STAGES';
export interface SetStagesAction {
  type: typeof SET_STAGES
  stageIds: Set<StageId>
}

export const SET_LABELS = 'FILTERING_SET_LABELS';
export interface SetLabelsAction {
  type: typeof SET_LABELS
  labels: Set<LabelId>
}

export const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
export interface SetPageSizeAction {
  type: typeof SET_PAGE_SIZE
  currentPageSize: PageSize
}

export type FilteringActionTypes =
  ChangeSortAction
  | SetVsCharactersAction
  | SetOffsetAction
  | SetMainCharactersAction
  | SetStagesAction
  | SetLabelsAction
  | SetPageSizeAction;
