import * as React from 'react';
import { Badge, Dropdown } from 'react-bootstrap';
import { AppFunctionComponent, NOOP } from './store';
import { connect } from 'react-redux';
import allActions from './all_actions';
import { FilterParameter } from './types';

type Parameters = {
  title: any
  bootstrapStyle: any
  allFilters: Set<FilterParameter>
  currentFilters: Set<FilterParameter>
  onClick: (filter: Set<string>) => void
};

const FilterMenu: AppFunctionComponent<Parameters, NOOP> = props => {
  const {
    title, bootstrapStyle, allFilters, currentFilters, onClick,
  } = props;
  return (
    <div className="panel-body">
      <Dropdown className="dropdown">
        <Dropdown.Toggle variant={bootstrapStyle} id="dropdown-basic">
          {title}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu">
          {Array.from(allFilters).map(filter => (
            <Dropdown.Item onSelect={() => onClick(new Set([filter.display]))} key={filter.id}>
              {(currentFilters.has(filter) ? '\u2713 ' : ' ') + filter.display}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <div>
        {Array.from(currentFilters).map(filter => (
          <Badge variant={bootstrapStyle} className="filter-pill" onClick={() => onClick(new Set([filter.display]))} key={filter.id}>
            &#215;
            {' '}
            {filter.display}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default connect(null, allActions)(FilterMenu);
