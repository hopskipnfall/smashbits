import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
// import * as actionCreators from './action_creators';
import BitsContainer from './BitsContainer';
import { AppState, PropsFromRedux, AppComponent } from './store';
import { Bit } from './types';
import * as Immutable from 'immutable';
import { thunkFetchBits, thunkFetchBit } from './thunks';
import { Action } from 'history';
import {Dispatch} from 'react';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RouteChildrenProps } from 'react-router-dom';

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, null, AnyAction>) => ({
  thunkFetchBit: (bitId: string) => dispatch(thunkFetchBit(bitId)),
});

const mapStateToProps = (state: AppState, ownProps: any) => ({
  bits: state.bits.items,
});

// type InputProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & PropsFromRedux  & {
// };

// const AppComponent<RequiredProps, StateToProps extends () => any, DispatchToProps extends () => any> = new Component<RequiredProps & ReturnType<StateToProps> & ReturnType<DispatchToProps>, AppState>;

// function AppComponent<RequiredProps, StateToProps extends () => any, DispatchToProps extends () => any>() {
//   return new Component<RequiredProps & ReturnType<StateToProps> & ReturnType<DispatchToProps>, AppState>;
// }

// class BitPage extends Component<InputProps, AppState> {
class BitPage extends AppComponent<{}, typeof mapStateToProps, typeof mapDispatchToProps> {
  bits: Immutable.Map<string, Bit>;

  componentDidMount() {
    this.props.thunkFetchBit(this.props.match!.params.bitId);
  }

  render() {
    return (
      <BitsContainer />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BitPage);
