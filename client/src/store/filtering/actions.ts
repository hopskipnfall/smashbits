import { SortOption, CHANGE_SORT, SET_VS_CHARACTERS, SetOffsetAction, SET_OFFSET, SetVsCharactersAction, ChangeSortAction } from "./types";
import { Bit, Vote, CharacterId } from "../../types";

export function changeSort(sort: SortOption): ChangeSortAction {
  return {
    type: CHANGE_SORT,
    sort,
  }
}

export function setVsCharacters(characters: Set<CharacterId>): SetVsCharactersAction {
  return {
    type: SET_VS_CHARACTERS,
    characters,
  }
}

export function setOffset(offset: number): SetOffsetAction {
  return {
    type: SET_OFFSET,
    offset,
  }
}
