import * as React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import { AppFunctionComponent, AppState } from './store';
import { SortOption, SORT_OPTIONS } from './types';

type InputProps = {};

const mapStateToProps = (state: AppState, ownProps: InputProps) => ({
  currentSort: state.filtering.sort,
});

const SortingMenu: AppFunctionComponent<InputProps, typeof mapStateToProps> = (
  props,
) => {
  const { currentSort, thunkChangeSort } = props;
  return (
    <DropdownButton
      variant="info"
      title={`Sorting: ${currentSort}`}
      id="sorting-menu"
    >
      {SORT_OPTIONS.map((sort: SortOption) => (
        <Dropdown.Item onSelect={() => thunkChangeSort(sort)} key={sort}>
          {sort}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default connect(mapStateToProps, allActions)(SortingMenu);
