import * as React from 'react';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import Bit from './Bit';
import { AppFunctionComponent, AppState, NOOP } from './store';

type InputProps = {};

const mapStateToProps = (state: AppState, ownProps: InputProps) => ({
  bits: state.bits.items,
});

  // return (Array.from(props.bits)).map((bitRow: [string, BitType]) => <Bit bit={bitRow[1]} key={bitRow[0]} />);
const BitsContainer: AppFunctionComponent<InputProps, typeof mapStateToProps, NOOP> = props => (
  <div>
    {props.bits.valueSeq().map(bit => <Bit bit={bit} key={bit.postId} />)}
  </div>
);

export default connect(mapStateToProps, allActions)(BitsContainer);
