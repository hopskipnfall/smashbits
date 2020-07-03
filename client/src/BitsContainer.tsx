import * as Immutable from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';
import Bit from './Bit';
import { filterBits } from './bits_util';
import { Bit as BitType } from './types';
import { AppState, PropsFromRedux } from './store';
import { SortOption } from './store/filtering/types';

type Props = PropsFromRedux & {
  bits: Immutable.Map<string, BitType>
  filters: any
  comments: Immutable.Set<any>
  sortMethod: SortOption
};

const BitsContainer = (props: Props) => (
  <div>
    {props.bits!.valueSeq().map((bit: BitType) => <Bit bit={bit} key={bit.postId} {...props} />)}
  </div>
);

const mapStateToProps = (state: AppState, ownProps: PropsFromRedux) => ({
  bits: filterBits(state, ownProps.filters),
  comments: state.bits.comments,
  sortMethod: state.bits.sort,
});

export default connect(mapStateToProps, actionCreators)(BitsContainer);
