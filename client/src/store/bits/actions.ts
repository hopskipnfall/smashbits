import { Bit, Status, Vote } from "../../types";
import { AddBitAction, ADD_BIT, ChangeVoteAction, CHANGE_VOTE, ClearBitsAction, CLEAR_BITS, ReplaceBitsAction, REPLACE_BITS, SetOptimisticBitStatusAction, SET_OPTIMISTIC_BIT_STATUS } from "./types";

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
} as AddBitAction);

export const addOptimisticBit = (bit: Bit) => ({
  type: ADD_BIT,
  optimistic: true,
  bit,
} as AddBitAction);

export const setOptimisticBitStatus = (bitId: string, status: Status) => ({
  type: SET_OPTIMISTIC_BIT_STATUS,
  status,
  bitId,
} as SetOptimisticBitStatusAction);

export const replaceBits = (bits: Bit[]) => ({
  type: REPLACE_BITS,
  bits,
} as ReplaceBitsAction);
