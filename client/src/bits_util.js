import { fromJS, Set, List } from 'immutable';

export function jsonToBit(jsonBit) {
  return fromJS(jsonBit)
      .updateIn(['mainChars'], List(), jsonListToStringList)
      .updateIn(['vsChars'], List(), jsonListToStringList)
      .updateIn(['stages'], List(), jsonListToStringList)
      .updateIn(['standaloneTags'], List(), jsonListToStringList);
};

const jsonListToStringList = list =>
    list.get(0)
        ? Set(list.get(0).split(','))
        : list;