import { fromJS, Set, List } from 'immutable';

export function jsonToBit(jsonBit) {
  return fromJS(jsonBit)
      .updateIn(['mainChars'], List(), jsonListToSymbols)
      .updateIn(['vsChars'], List(), jsonListToSymbols)
      .updateIn(['stages'], List(), jsonListToSymbols)
      .updateIn(['standaloneTags'], List(), jsonListToSymbols);
};

const jsonListToSymbols = list =>
    list.get(0)
        ? Set(list.get(0).split(',').map(tag => Symbol.for(tag)))
        : list;