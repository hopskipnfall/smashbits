import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';
import BitsContainer from './BitsContainer';
import { AppState, PropsFromRedux } from './store';

type BitPageProps = PropsFromRedux & {
  fetchBit: typeof actionCreators.fetchBit
  match: any
};

class BitPage extends Component<BitPageProps, AppState> {
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

export default connector(BitPage);
