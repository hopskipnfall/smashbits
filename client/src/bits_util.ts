import * as Immutable from 'immutable';
import { AppState } from './store';

export const filterBits = (state: AppState, filters: any = {}) => {
  const mainChars = Immutable.Set<string>(filters.currentMainChars || []);
  const vsChars = Immutable.Set<string>(filters.currentVsChars || []);
  const stages = Immutable.Set<string>(filters.currentStages || []);
  const standaloneTags = Immutable.Set<string>(filters.currentStandaloneTags || []);

  return state.bits.items.filter(bit => (mainChars.size === 0
        || mainChars.intersect(bit.mainChars).size !== 0)
        && (vsChars.size === 0
            || vsChars.intersect(bit.vsChars).size !== 0)
        && (stages.size === 0
            || stages.intersect(bit.stages).size !== 0)
        && (standaloneTags.size === 0
            || standaloneTags.intersect(bit.standaloneTags).size !== 0));
};
