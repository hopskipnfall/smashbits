import * as React from 'react';
import { Button, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import BitsContainer from './BitsContainer';
import CreateBitButton from './CreateBitButton';
import FilterControl from './FilterControl';
import PageSizeMenu from './PageSizeMenu';
import SortingMenu from './SortingMenu';
import { AppRouteComponent, AppState } from './store';

interface InputProps {}

const mapStateToProps = (state: AppState, ownProps: InputProps) => ({
  bits: state.bits.items,
  optimisticBits: state.bits.optimisticItems,
});

class Home extends AppRouteComponent<typeof mapStateToProps> {
  componentDidMount() {
    this.props.thunkSetStateFromUrlBar();
    this.props.thunkFetchBits(); // maybe get rid of this this looks wrong
  }

  render() {
    const { thunkFetchNextPage, thunkFetchPreviousPage } = this.props;
    return (
      <div>
        <Col md={4}>
          <CreateBitButton />
          <FilterControl />
        </Col>
        <Col md={8}>
          <span>
            <SortingMenu />
            <span style={{ float: 'right' }}>
              <PageSizeMenu />
              <Button onClick={() => thunkFetchPreviousPage()}> &lt; </Button>
              <Button onClick={() => thunkFetchNextPage()}> &gt; </Button>
            </span>
          </span>
          <BitsContainer bits={this.props.optimisticBits} />
          <BitsContainer bits={this.props.bits} />
        </Col>
      </div>
    );
  }
}

export default connect(mapStateToProps, allActions)(Home);
