import * as React from 'react';
import { Button, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import BitsContainer from './BitsContainer';
import CreateBitButton from './CreateBitButton';
import FilterControl from './FilterControl';
import PageSizeMenu from './PageSizeMenu';
import SortingMenu from './SortingMenu';
import { AppRouteComponent, NOOP } from './store';

class Home extends AppRouteComponent<NOOP> {
  componentDidMount() {
    this.props.thunkFetchBits(); // maybe get rid of this this looks wrong
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        <Col md={4}>
          <CreateBitButton />
          <FilterControl />
          {/* filters={getFilters(location.search)} /> */}
        </Col>
        <Col md={8}>
          <span>
            <SortingMenu />
            <span style={{ float: 'right' }}>
              <PageSizeMenu />
              <Button onClick={() => console.log('go to next page!')}> &lt; </Button>
              <Button onClick={() => console.log('go to previous page!')}> &gt; </Button>
            </span>
          </span>
          <BitsContainer />
        </Col>
      </div>
    );
  }

  // TODO: make these into thunks
  // fetchNextPage() {
  //   const offset = (getOffset(history.location.search) || 0)
  //     + (getPageSize(history.location.search) || DEFAULT_PAGE_SIZE);
  //   this.props.setOffset(offset);
  //   this.props.thunkFetchBits();
  // }

  // fetchPreviousPage() {
  //   const offset = Math.max(
  //     0,
  //     (getOffset(history.location.search) || 0)
  //     - (getPageSize(history.location.search) || DEFAULT_PAGE_SIZE));
  //   this.props.setOffset(offset);
  //   this.props.thunkFetchBits();
  // }
}

export default connect(null, allActions)(Home);
