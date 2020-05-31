import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';

const SortingMenu = props => {
  const { sorts, currentSort, changeSort } = props;
  return (
    <DropdownButton bsStyle="info" title={`Sorting: ${currentSort}`} id="sorting-menu">
      {sorts.map(sort =>
        <MenuItem onSelect={() => changeSort(sort)} key={sort}>
          {sort}
        </MenuItem>)}
    </DropdownButton>
  );
};

const mapStateToProps = (state, ownProps) => ({
  sorts: state.get('sorts'),
  currentSort: ownProps.sort,
});

export default connect(mapStateToProps, actionCreators)(SortingMenu);
