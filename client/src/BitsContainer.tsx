import * as Immutable from 'immutable';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import Bit from './Bit';
import { AppState, PropsFromRedux } from './store';
import { Bit as BitType } from './types';

const mapStateToProps = (state: AppState, ownProps: any) => ({
  bits: state.bits.items,
});

type InputProps = ReturnType<typeof mapStateToProps> & PropsFromRedux  & {
};

const BitsContainer: FunctionComponent<InputProps> = props => (
  <div>
    {props.bits.valueSeq().map(bit => <Bit bit={bit} key={bit.postId} {...props} />)}
  </div>
);

export default connect(mapStateToProps, null)(BitsContainer);
