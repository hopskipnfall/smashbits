import * as Immutable from 'immutable';
import { Bit } from './types';

export function setBitState(state: Immutable.Map<string, any>, id: string) {
  return {
    /** Clone and edit a copy of the bit. */
    edit(editFn: (bit: Bit) => void) {
      const clonedBit = new Bit(state.getIn(['bits', id]));
      editFn(clonedBit);
      return state.setIn(['bits', id], clonedBit);
    },

    /** Add a new bit to the state. */
    insert(bit: Bit) {
      return state.setIn(['bits', id], bit);
    },
  }
}
