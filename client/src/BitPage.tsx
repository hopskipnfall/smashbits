import * as Immutable from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import allActions from './all_actions';
import BitsContainer from './BitsContainer';
import { AppComponent, AppState } from './store';
import { Bit } from './types';

type InputProps = {};

const mapStateToProps = (state: AppState, ownProps: InputProps) => ({
  bits: state.bits.items,
});

class BitPage extends AppComponent<InputProps, typeof mapStateToProps> {
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
