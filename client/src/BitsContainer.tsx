import { Map } from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';
import Bit from './Bit';
import { filterBits } from './bits_util';

const BitsContainer = (props: any) => (
  <div>
    {props.bits.valueSeq().map((entry: any) => <Bit bit={entry} key={entry} {...props} />)}
  </div>
);

const mapStateToProps = (state: Map<string, any>, ownProps: any) => ({
  bits: filterBits(state, ownProps.filters),
  comments: state.get('comments', Map()),
});

export default connect(mapStateToProps, actionCreators)(BitsContainer);
