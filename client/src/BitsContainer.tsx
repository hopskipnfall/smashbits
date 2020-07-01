import * as Immutable from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';
import Bit from './Bit';
import { filterBits } from './bits_util';
import { Bit as BitType } from './types';

type Props = {
  bits?: Immutable.Map<string, BitType>
  filters?: any
  comments?: any
}

const BitsContainer = (props: Props) => (
  <div>
    {props.bits!.valueSeq().map((bit: BitType) => <Bit bit={bit} key={bit.postId} {...props} />)}
  </div>
);

const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: Props) => ({
  bits: filterBits(state, ownProps.filters),
  comments: state.get('comments', Immutable.Map()),
} as Props);

export default connect(mapStateToProps, actionCreators)(BitsContainer);
