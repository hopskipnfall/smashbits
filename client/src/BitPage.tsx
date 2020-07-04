import * as Immutable from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import BitsContainer from './BitsContainer';
import { AppComponent, AppState, PropsFromRedux } from './store';
import { Bit } from './types';
import { allActions } from './all_actions';

const mapStateToProps = (state: AppState, ownProps: any) => ({
  bits: state.bits.items,
});

class BitPage extends AppComponent<PropsFromRedux, typeof mapStateToProps> {
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

export default connect(mapStateToProps, allActions)(BitPage);
