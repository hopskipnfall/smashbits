import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
// import * as actionCreators from './action_creators';
import BitsContainer from './BitsContainer';
import { AppState, PropsFromRedux } from './store';
import { Bit } from './types';
import * as Immutable from 'immutable';
import { thunkFetchBits } from './thunks';
import { Action } from 'history';
import {Dispatch} from 'react';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type BitPageProps = PropsFromRedux & {
  fetchBit: typeof thunkFetchBits
  match: any
};

class BitPage extends Component<any, any> {
  bits: Immutable.Map<string, Bit>;

  componentDidMount() {
    console.log('BitPage', this);
    // const {thunkFetchBits, dispatch} = this.props
    this.props.thunkFetchBits(this.props.match.params.bitId);
  }

  render() {
    return (
      <BitsContainer />
    );
  }
}

export default connect((state: AppState, ownProps: any) => {
  console.log('state', state)
  return {
    bits: state.bits.items,
  }
}, (dispatch: ThunkDispatch<AppState, null, AnyAction>) => {
  return {
    thunkFetchBits: () => dispatch(thunkFetchBits()),
  };
})(BitPage);
