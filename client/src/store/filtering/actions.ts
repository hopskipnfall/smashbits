import { Character, Label, PageSize, SortOption, Stage } from '../../types';
import {
  ChangeSortAction,
  CHANGE_SORT,
  SetLabelsAction,
  SetMainCharactersAction,
  SetOffsetAction,
  SetPageSizeAction,
  SetStagesAction,
  SetVsCharactersAction,
  SET_LABELS,
  SET_MAIN_CHARACTERS,
  SET_OFFSET,
  SET_PAGE_SIZE,
  SET_STAGES,
  SET_VS_CHARACTERS,
} from './types';

export const changeSort = (sort: SortOption) =>
  ({
    type: CHANGE_SORT,
    sort,
  } as ChangeSortAction);

export const setVsCharacters = (characters: Set<Character>) =>
  ({
    type: SET_VS_CHARACTERS,
    characters,
  } as SetVsCharactersAction);

export const setMainCharacters = (characters: Set<Character>) =>
  ({
    type: SET_MAIN_CHARACTERS,
    characters,
  } as SetMainCharactersAction);

export const setOffset = (offset: number) =>
  ({
    type: SET_OFFSET,
    offset,
  } as SetOffsetAction);

export const setStages = (stageIds: Set<Stage>) =>
  ({
    type: SET_STAGES,
    stageIds,
  } as SetStagesAction);

export const setLabels = (labels: Set<Label>) =>
  ({
    type: SET_LABELS,
    labels,
  } as SetLabelsAction);

export const setPageSize = (currentPageSize: PageSize) =>
  ({
    type: SET_PAGE_SIZE,
    currentPageSize,
  } as SetPageSizeAction);
