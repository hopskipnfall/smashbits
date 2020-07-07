import * as React from 'react';
import { connect } from 'react-redux';
import Bit from './Bit';
import { AppFunctionComponent, AppState, NOOP, PropsFromRedux } from './store';
import allActions from './all_actions';

type InputProps = {};

const mapStateToProps = (state: AppState, ownProps: InputProps) => ({
  bits: state.bits.items,
});

const BitsContainer: AppFunctionComponent<InputProps, typeof mapStateToProps, NOOP> = props => (
  <div>
    {props.bits.valueSeq().map(bit => <Bit bit={bit} key={bit.postId} />)}
  </div>
);

export default connect(mapStateToProps, allActions)(BitsContainer);
