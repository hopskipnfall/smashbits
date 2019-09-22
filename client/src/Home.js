import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import BitsContainer from './BitsContainer';
import CreateBitButton from './CreateBitButton';
import SortingMenu from './SortingMenu';
import FilterControl from './FilterControl';
import PageSizeMenu from './PageSizeMenu';
import * as actionCreators from './action_creators';
import { getFilters, getSort } from './uri_util';
import { SORT_DATE } from './reducer';

class Home extends Component {
  constructor(props, context) {
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
            <span style={{float: 'right'}}>
              <PageSizeMenu />
              <Button onClick={() => fetchPreviousPage()}> &lt; </Button>
              <Button onClick={() => fetchNextPage()}> &gt; </Button>
            </span>
          </span>
          <BitsContainer filters={getFilters(location.search)} />
        </Col>
      </div>
    );
  }
};

export default connect(null, actionCreators)(Home);