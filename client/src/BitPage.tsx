import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';
import BitsContainer from './BitsContainer';

type Props = {
  fetchBit: typeof actionCreators.fetchBit
  match: any
}

class BitPage extends Component<Props> {
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
