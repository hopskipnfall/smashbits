import { Map } from 'immutable';
import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';
import Bit from './Bit';
import { filterBits } from './bits_util';

const BitsContainer = props => (
  <div>
    {props.bits.valueSeq().map(entry => <Bit bit={entry} key={entry} {...props} />)}
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  bits: filterBits(state, ownProps.filters),
  comments: state.get('comments', Map()),
});

export default connect(mapStateToProps, actionCreators)(BitsContainer);
