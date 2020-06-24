import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';
import BitsContainer from './BitsContainer';

class BitPage extends Component {
  componentDidMount() {
    const { fetchBit } = this.props;
    fetchBit(this.props.match.params.bitId);
  }

  render() {
    return (
      <BitsContainer />
    );
  }
}

export default connect(null, actionCreators)(BitPage);
