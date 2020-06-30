import { Map, Set } from 'immutable';

export const filterBits = (state: Map<string, any>, filters: any = {}) => {
  const bits = state.get('bits', Map());
  const mainChars = Set(filters.currentMainChars || []);
  const vsChars = Set(filters.currentVsChars || []);
  const stages = Set(filters.currentStages || []);
  const standaloneTags = Set(filters.currentStandaloneTags || []);

  return bits.filter((bit: Map<string, any>) => (mainChars.size === 0
          || mainChars.intersect(bit.get('mainChars', Set())).size !== 0)
      && (vsChars.size === 0
          || vsChars.intersect(bit.get('vsChars', Set())).size !== 0)
      && (stages.size === 0
          || stages.intersect(bit.get('stages', Set())).size !== 0)
      && (standaloneTags.size === 0
          || standaloneTags.intersect(bit.get('standaloneTags', Set())).size !== 0));
};
