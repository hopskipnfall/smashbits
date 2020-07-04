import * as React from 'react';
import { Component } from 'react';
import { Button, Col } from 'react-bootstrap';
import { connect, MapDispatchToPropsParam } from 'react-redux';
import BitsContainer from './BitsContainer';
import CreateBitButton from './CreateBitButton';
import FilterControl from './FilterControl';
import history from './history';
// import PageSizeMenu from './PageSizeMenu';
// import { DEFAULT_PAGE_SIZE, SORT_DATE } from './reducer';
// import SortingMenu from './SortingMenu';
import { PropsFromRedux, AppComponent, NOOP } from './store';
import { setOffset } from './store/filtering/actions';
import { thunkFetchBits } from './thunks';
// import { getFilters, getOffset, getPageSize, getSort } from './uri_util';
import { allActions } from './all_actions';

type Props = {
};

class Home extends AppComponent<Props, NOOP> {
  componentDidMount() {
    this.props.thunkFetchBits(); // maybe get rid of this this looks wrong
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        <Col md={4}>
          {/* <CreateBitButton /> */}
          <FilterControl />
           {/* filters={getFilters(location.search)} /> */}
        </Col>
        <Col md={8}>
          <span>
            {/* <SortingMenu sort={getSort(location.search) || SORT_DATE} /> */}
            <span style={{ float: 'right' }}>
              {/* <PageSizeMenu pageSize={getPageSize(location.search) || DEFAULT_PAGE_SIZE} /> */}
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
