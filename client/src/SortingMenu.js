import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as actionCreators from './action_creators';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const SortingMenu = props => {
  const { sorts = Map(), currentSort, changeSort } = props;
  return (
    <DropdownButton bsStyle="info" title={`Sorting: ${currentSort}`} id="sorting-menu">
      {sorts.map(sort =>
        <MenuItem onSelect={() => changeSort(sort)} key={sort}>
          {sort}
        </MenuItem>)}
    </DropdownButton>
  );
};

const mapStateToProps = state => ({
  sorts: state.getIn(['sorting', 'sorts']),
  currentSort: state.getIn(['sorting', 'currentSort']),
});

export default connect(mapStateToProps, actionCreators)(SortingMenu);