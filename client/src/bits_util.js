import { fromJS } from 'immutable';

export function jsonToBit(jsonBit) {
  return fromJS(jsonBit)
      .updateIn(['mainChars'], [], chars => Set(chars.map(char => Symbol.for(char))))
      .updateIn(['vsChars'], [], chars => Set(chars.map(char => Symbol.for(char))))
      .updateIn(['stages'], [], stages => Set(stages.map(stage => Symbol.for(stage))))
      .updateIn(['standaloneTags'], [], tags => Set(tags.map(tag => Symbol.for(tag))));
};