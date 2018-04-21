import * as actionCreators from './action_creators';
import Bit from './Bit';
import { Map, Set } from 'immutable';
import { connect } from 'react-redux';
import React from 'react';

const BitsContainer = props => (
  <div>
    {props.bits.map(entry =>
      <Bit bit={entry} key={entry} {...props} />
    )}
  </div>
);

const mapStateToProps = state => ({
  bits: filterBits(state),
  comments: state.get('comments', Map())
});

const filterBits = state => {
  const bits = state.get('bits', Map());
  const mainChars = state.getIn(['filtering', 'currentMainChars'], Set());
  const vsChars = state.getIn(['filtering', 'currentVsChars'], Set());
  const stages = state.getIn(['filtering', 'currentStages'], Set());
  const standaloneTags = state.getIn(['filtering', 'currentStandaloneTags'], Set());

  return bits.filter(bit =>
      (mainChars.size === 0
          ? true
          : mainChars.intersect(bit.get('mainChars', Set())).size !== 0)
      && (vsChars.size === 0
          ? true
          : vsChars.intersect(bit.get('vsChars', Set())).size !== 0)
      && (stages.size === 0
          ? true
          : stages.intersect(bit.get('stages', Set())).size !== 0)
      && (standaloneTags.size === 0
          ? true
          : standaloneTags.intersect(bit.get('standaloneTags', Set())).size !== 0));
};

export default connect(mapStateToProps, actionCreators)(BitsContainer);