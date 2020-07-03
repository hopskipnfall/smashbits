import * as Immutable from 'immutable';
import { BitsState, BitsActionTypes, CLEAR_BITS, CHANGE_VOTE, ADD_BIT, REPLACE_BITS } from './types';
import { Bit } from '../../types';

export function setBitState(state: BitsState, id: string) {
  return {
    /** Clone and edit a copy of the bit. */
    edit(editFn: (bit: Bit) => void): BitsState {
      const clonedBit = new Bit(state.items.get(id));
      editFn(clonedBit);
      
      return {
        ...state,
        items: state.items.set(id, clonedBit)
      };
    },

    /** Add a new bit to the state. */
    insert(bit: Bit): BitsState {
      return {
        ...state,
        items: state.items.set(id, bit),
      }
    },
  };
}

const initialState : BitsState = {
  items: Immutable.Map<string, Bit>(),
  comments: Immutable.Set<any>(),
};

function bitArrayToMap(bits: Bit[]) {
  return Immutable.Map<string, Bit>([
    ...(bits.map(bit => [bit.postId, bit]) as [string, Bit][]),
  ]);
}

export function bitsReducer(
  state = initialState,
  action: BitsActionTypes,
): BitsState {
  switch(action.type) {
    case CLEAR_BITS:
      return {
        ...state,
        items: Immutable.Map(),
      }
    case CHANGE_VOTE:
      return setBitState(state, action.bitId).edit(b => b.userVote = action.vote);
    case ADD_BIT:
      return setBitState(state, action.bit.postId).insert(action.bit);
    case REPLACE_BITS:
      return {
        ...state,
        items: bitArrayToMap(action.bits),
      }
    default:
      return state;
  }
}
