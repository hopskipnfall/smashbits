import React, { Component } from 'react';
import BitsContainer from './BitsContainer';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';

class BitPage extends Component {
  constructor(props, context) {
    super(props, context);
    const { fetchBit } = props;
    fetchBit(props.match.params.bitId);
  }

  render() {
    return (
      <BitsContainer />
    );
  }
}

export default connect(null, actionCreators)(BitPage);