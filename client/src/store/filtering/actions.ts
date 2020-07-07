import { CharacterId, LabelId, StageId } from "../../types";
import { ChangeSortAction, CHANGE_SORT, SetLabelsAction, SetMainCharactersAction, SetOffsetAction, SetStagesAction, SetVsCharactersAction, SET_LABELS, SET_MAIN_CHARACTERS, SET_OFFSET, SET_STAGES, SET_VS_CHARACTERS, SortOption } from "./types";

export const changeSort = (sort: SortOption) => ({
  type: CHANGE_SORT,
  sort,
} as ChangeSortAction);

export const setVsCharacters = (characters: Set<CharacterId>) => ({
  type: SET_VS_CHARACTERS,
  characters,
} as SetVsCharactersAction);

export const setMainCharacters = (characters: Set<CharacterId>) => ({
  type: SET_MAIN_CHARACTERS,
  characters,
} as SetMainCharactersAction);

export const setOffset = (offset: number) => ({
  type: SET_OFFSET,
  offset,
} as SetOffsetAction);

export const setStages = (stageIds: Set<StageId>) => ({
  type: SET_STAGES,
  stageIds,
} as SetStagesAction);

export const setLabels = (labels: Set<LabelId>) => ({
  type: SET_LABELS,
  labels,
} as SetLabelsAction);
