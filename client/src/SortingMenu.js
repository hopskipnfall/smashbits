import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as actionCreators from './action_creators';

const SortingMenu = props => {
  const { sorts = Map(), currentSort, changeSort } = props;
  return (
    <div className="dropdown">
      <button className="btn btn-info dropdown-toggle" type="button" data-toggle="dropdown">
        <span className="dropdown-caret-margin">
          Sorting: {Symbol.keyFor(currentSort)}
        </span>
        <span className="caret" />
      </button>
      <div className="dropdown-menu">
        {sorts.map(sort => 
          <div className='dropdown-option' key={Symbol.keyFor(sort)}>
            <div onClick={() => changeSort(sort)}>
              {Symbol.keyFor(sort)}
            </div>
          </div>)}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  sorts: state.getIn(['sorting', 'sorts']),
  currentSort: state.getIn(['sorting', 'currentSort']),
});

export default connect(mapStateToProps, actionCreators)(SortingMenu);