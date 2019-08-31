import React, { Component } from 'react';
import BitsContainer from './BitsContainer';
import CreateBitButton from './CreateBitButton';
import SortingMenu from './SortingMenu';
import FilterControl from './FilterControl';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    const { fetchBits } = props;
    fetchBits();
  }

  render() {
    return (
      <div>
        <Col md={4}>
          <CreateBitButton />
          <FilterControl />
        </Col>
        <Col md={8}>
          <SortingMenu />
          <BitsContainer />
        </Col>
      </div>
    );
  }
};

export default connect(null, actionCreators)(Home);