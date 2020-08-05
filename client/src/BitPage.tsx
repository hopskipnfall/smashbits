import * as Immutable from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import BitsContainer from './BitsContainer';
import { AppComponent, AppState, AppRouteComponent } from './store';
import { Bit } from './types';

const mapStateToProps = (state: AppState) => ({
  bits: state.bits.items,
});

class BitPage extends AppRouteComponent<typeof mapStateToProps> {
  bits: Immutable.Map<string, Bit>;

  componentDidMount() {
    this.props.thunkFetchBit((this.props.match!.params as any).bitId);
  }

  render() {
    return (
      <BitsContainer bits={this.bits} />
    );
  }
}

export default connect(mapStateToProps, allActions)(BitPage);
