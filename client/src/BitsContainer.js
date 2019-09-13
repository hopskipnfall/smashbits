import * as actionCreators from './action_creators';
import { filterBits } from './bits_util';
import Bit from './Bit';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import React from 'react';

const BitsContainer = props => (
  <div>
    {props.bits.valueSeq().map(entry =>
      <Bit bit={entry} key={entry} {...props} />
    )}
  </div>
);

const mapStateToProps = state => ({
  bits: filterBits(state),
  comments: state.get('comments', Map())
});

export default connect(mapStateToProps, actionCreators)(BitsContainer);