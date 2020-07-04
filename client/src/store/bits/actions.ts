import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppState } from "..";
import { Bit, Vote } from "../../types";
import { AddBitAction, ADD_BIT, ChangeVoteAction, CHANGE_VOTE, ClearBitsAction, CLEAR_BITS, ReplaceBitsAction, REPLACE_BITS } from "./types";

export const clearBits = () => ({
  type: CLEAR_BITS,
} as ClearBitsAction);

export const changeVote = (bitId: string, vote: Vote) => ({
  type: CHANGE_VOTE,
  bitId,
  vote,
} as ChangeVoteAction);

export const addBit = (bit: Bit) => ({
    type: ADD_BIT,
    bit,
} as  AddBitAction);

export const replaceBits = (bits: Bit[]) => ({
    type: REPLACE_BITS,
    bits,
} as ReplaceBitsAction);

export const bitsActions = {
  clearBits, changeVote, addBit, replaceBits,
}

type AppThunkAction = ThunkAction<any, AppState, null, AnyAction>

export type bitsActionTypes = {
  clearBits: AppThunkAction
  changeVote:  AppThunkAction
  addBit:  AppThunkAction
  replaceBits:  AppThunkAction
}
