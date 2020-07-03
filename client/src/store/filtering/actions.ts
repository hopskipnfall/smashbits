import { SortOption, CHANGE_SORT, SetMainCharactersAction, SET_MAIN_CHARACTERS, SET_VS_CHARACTERS, SetOffsetAction, SET_OFFSET, SetVsCharactersAction, ChangeSortAction } from "./types";
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

export function setMainCharacters(characters: Set<CharacterId>): SetMainCharactersAction {
  return {
    type: SET_MAIN_CHARACTERS,
    characters,
  }
}

export function setOffset(offset: number): SetOffsetAction {
  return {
    type: SET_OFFSET,
    offset,
  }
}
