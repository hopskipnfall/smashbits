import * as Immutable from 'immutable';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import Bit from './Bit';
import { AppState, PropsFromRedux } from './store';
import { Bit as BitType } from './types';

type Props = PropsFromRedux & {
  bits: Immutable.Map<string, BitType>
};

const BitsContainer: FunctionComponent<Props> = props => (
  <div>
    {props.bits.valueSeq().map((bit: BitType) => <Bit bit={bit} key={bit.postId} {...props} />)}
  </div>
);

const mapStateToProps = (state: AppState, ownProps: PropsFromRedux) => ({
  bits: state.bits.items,
});

export default connect(mapStateToProps, null)(BitsContainer);
