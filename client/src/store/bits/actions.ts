import { CHANGE_VOTE, CLEAR_BITS, ADD_BIT, REPLACE_BITS, AddBitAction, ChangeVoteAction, ReplaceBitsAction } from "./types";
import { Bit, Vote } from "../../types";

export function clearBits() {
  return { type: CLEAR_BITS };
}

export function changeVote(bitId: string, vote: Vote): ChangeVoteAction {
  return {
    type: CHANGE_VOTE,
    bitId,
    vote,
  };
}

export function addBit(bit: Bit): AddBitAction {
  return {
    type: ADD_BIT,
    bit,
  };
}

export function replaceBits(bits: Bit[]): ReplaceBitsAction {
  return {
    type: REPLACE_BITS,
    bits,
  };
}
