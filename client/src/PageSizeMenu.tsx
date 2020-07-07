import * as React from 'react';
import { connect } from 'react-redux';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { allActions } from './all_actions';
import { AppState, AppFunctionComponent } from './store';
import { PAGE_SIZES } from './types';

type Parameters = {};

const mapStateToProps = (state: AppState, ownProps: Parameters) => ({
  pageSize: state.filtering.currentPageSize,
});

const PageSizeMenu: AppFunctionComponent<Parameters, typeof mapStateToProps> = props => {
  const { pageSize, thunkChangePageSize } = props;
  return (
    <span>
      Results per page:
      <DropdownButton variant="info" title={`${pageSize}`} id="page-size-menu">
        {PAGE_SIZES.map(size => (
          <Dropdown.Item onSelect={() => thunkChangePageSize(size)} key={size}>
            {size}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </span>
  );
};

export default connect(mapStateToProps, allActions)(PageSizeMenu);
