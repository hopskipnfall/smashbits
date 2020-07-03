import * as Immutable from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import BitsContainer from './BitsContainer';
import { AppComponent, AppState, PropsFromRedux } from './store';
import { thunkFetchBit } from './thunks';
import { Bit } from './types';

const mapStateToProps = (state: AppState, ownProps: any) => ({
  bits: state.bits.items,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, null, AnyAction>) => ({
  thunkFetchBit: (bitId: string) => dispatch(thunkFetchBit(bitId)),
});

class BitPage extends AppComponent<PropsFromRedux, typeof mapStateToProps, typeof mapDispatchToProps> {
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
