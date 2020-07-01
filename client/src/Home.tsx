import * as React from 'react';
import { Component } from 'react';
import { Button, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';
import BitsContainer from './BitsContainer';
import CreateBitButton from './CreateBitButton';
import FilterControl from './FilterControl';
import PageSizeMenu from './PageSizeMenu';
import { DEFAULT_PAGE_SIZE, SORT_DATE } from './reducer';
import SortingMenu from './SortingMenu';
import { getFilters, getPageSize, getSort } from './uri_util';

type Props = {
  fetchBits: typeof actionCreators.fetchBits
  fetchNextPage: typeof actionCreators.fetchNextPage
  fetchPreviousPage: typeof actionCreators.fetchPreviousPage
  location: any
}

class Home extends Component<Props> {
  constructor(props: Props, context: Map<string, any>) {
    super(props, context);
    const { fetchBits } = props;
    fetchBits();
  }

  render() {
    const { fetchNextPage, fetchPreviousPage, location } = this.props;
    return (
      <div>
        <Col md={4}>
          <CreateBitButton />
          <FilterControl filters={getFilters(location.search)} />
        </Col>
        <Col md={8}>
          <span>
            <SortingMenu sort={getSort(location.search) || SORT_DATE} />
            <span style={{ float: 'right' }}>
              <PageSizeMenu pageSize={getPageSize(location.search) || DEFAULT_PAGE_SIZE} />
              <Button onClick={() => fetchPreviousPage()}> &lt; </Button>
              <Button onClick={() => fetchNextPage()}> &gt; </Button>
            </span>
          </span>
          <BitsContainer filters={getFilters(location.search)} />
        </Col>
      </div>
    );
  }
}

export default connect(null, actionCreators)(Home);
