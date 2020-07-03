import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';
import BitsContainer from './BitsContainer';
import { AppState, PropsFromRedux } from './store';
import { Bit } from './types';
import * as Immutable from 'immutable';

type BitPageProps = PropsFromRedux & {
  fetchBit: typeof actionCreators.fetchBit
  match: any
};

class BitPage extends Component<BitPageProps, AppState> {
  bits: Immutable.Map<string, Bit>;

  componentDidMount() {
    this.bits = this.state.bits.items;
    const { fetchBit } = this.props;
    fetchBit(this.props.match.params.bitId);
  }

  render() {
    return (
      <BitsContainer bits={this.bits} />
    );
  }
}

export default connect(null, null)(BitPage);
