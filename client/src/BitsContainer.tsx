import * as React from 'react';
import { connect } from 'react-redux';
import Bit from './Bit';
import { AppFunctionComponent, AppState, NOOP, PropsFromRedux } from './store';

const mapStateToProps = (state: AppState, ownProps: any) => ({
  bits: state.bits.items,
});

const BitsContainer: AppFunctionComponent<PropsFromRedux, typeof mapStateToProps, NOOP> = props => (
  <div>
    {props.bits.valueSeq().map(bit => <Bit bit={bit} key={bit.postId} />)}
  </div>
);

export default connect(mapStateToProps, null)(BitsContainer);
