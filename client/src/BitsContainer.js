import * as actionCreators from './action_creators';
import Bit from './Bit';
import { Map } from 'immutable';
import {connect} from 'react-redux';
import React from 'react';

const BitsContainer = props => (
  <div>
    {props.bits.map(entry => 
      <Bit bit={entry} key={entry} {...props} />
    )}
  </div>
);

const mapStateToProps = state => ({
  bits: state.get('bits', Map())
});

export default connect(mapStateToProps, actionCreators)(BitsContainer);