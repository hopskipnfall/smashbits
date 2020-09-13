import * as Immutable from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import Bit from './Bit';
import { AppFunctionComponent, NOOP } from './store';
import { Bit as BitType } from './types';

type InputProps = {
  bits: Immutable.Map<string, BitType>
};

const BitsContainer: AppFunctionComponent<InputProps, NOOP, NOOP> = props => (
  <div>
    {props.bits.valueSeq().map(bit => <Bit bit={bit} key={bit.postId} />)}
  </div>
);

export default connect(null, allActions)(BitsContainer);
