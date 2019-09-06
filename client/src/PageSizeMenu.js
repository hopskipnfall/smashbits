import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const SIZES = [10, 25, 50];

const PageSizeMenu = props => {
  const { pageSize, setPageSize } = props;
  return (
    <span>
      Results per page:
      <DropdownButton bsStyle="info" title={`${pageSize}`} id="page-size-menu">
        {SIZES.map(size =>
          <MenuItem onSelect={() => setPageSize(size)} key={size}>
            {size}
          </MenuItem>)}
      </DropdownButton>
    </span>
  );
};

const mapStateToProps = state => ({
  pageSize: state.get('pageSize'),
});

export default connect(mapStateToProps, actionCreators)(PageSizeMenu);