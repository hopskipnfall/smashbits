import * as React from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import { AppFunctionComponent, AppState } from './store';
import { PAGE_SIZES } from './types';

type InputProps = {};

const mapStateToProps = (state: AppState, ownProps: InputProps) => ({
  pageSize: state.filtering.currentPageSize,
});

const PageSizeMenu: AppFunctionComponent<InputProps, typeof mapStateToProps> = (
  props,
) => {
  const { pageSize, thunkChangePageSize } = props;
  return (
    <span>
      Results per page:
      <DropdownButton as={ButtonGroup} variant="info" title={`${pageSize}`} id="page-size-menu">
        {PAGE_SIZES.map((size) => (
          <Dropdown.Item onSelect={() => thunkChangePageSize(size)} key={size}>
            {size}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </span>
  );
};

export default connect(mapStateToProps, allActions)(PageSizeMenu);
