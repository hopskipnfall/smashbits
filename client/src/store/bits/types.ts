import * as Immutable from 'immutable';
import { Bit, Vote } from '../../types';

export interface BitsState {
  items: Immutable.Map<string, Bit>
  comments: Immutable.Set<any>
}

export const CLEAR_BITS = 'BITS_CLEAR_ALL';
export interface ClearBitsAction {
  type: typeof CLEAR_BITS
}

export const VOTE_DOWN = -1;
export const VOTE_NEUTRAL = 0;
export const VOTE_UP = 1;

export const CHANGE_VOTE = 'BITS_CHANGE_VOTE';
export interface ChangeVoteAction {
  type: typeof CHANGE_VOTE
  bitId: string
  vote: Vote
}

export const ADD_BIT = 'BITS_ADD_BIT';
export interface AddBitAction {
  type: typeof ADD_BIT
  bit: Bit
}

export const REPLACE_BITS = 'BITS_REPLACE_BITS';
export interface ReplaceBitsAction {
  type: typeof REPLACE_BITS
  bits: Bit[]
}

export type BitsActionTypes =
  | ClearBitsAction
  | ChangeVoteAction
  | AddBitAction
  | ReplaceBitsAction;
