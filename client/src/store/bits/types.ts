import * as Immutable from 'immutable';
import { Bit, Vote, Status } from '../../types';

export interface BitsState {
  optimisticItems: Immutable.Map<string, Bit>
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
  // Whether we're adding this bit optimistically after creation,
  // while waiting for the server response.
  optimistic: boolean
}

export const REPLACE_BITS = 'BITS_REPLACE_BITS';
export interface ReplaceBitsAction {
  type: typeof REPLACE_BITS
  bits: Bit[]
}

export const SET_OPTIMISTIC_BIT_STATUS = 'BITS_SET_OPTIMISTIC_BIT_STATUS';
export interface SetOptimisticBitStatusAction {
  type: typeof SET_OPTIMISTIC_BIT_STATUS
  bitId: string
  status: Status
}

export type BitsActionTypes =
  | ClearBitsAction
  | ChangeVoteAction
  | AddBitAction
  | SetOptimisticBitStatusAction
  | ReplaceBitsAction;
