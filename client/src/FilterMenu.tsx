import * as React from 'react';
import { Badge, Dropdown } from 'react-bootstrap';
import { AppFunctionComponent, NOOP } from './store';
import { connect } from 'react-redux';
import { allActions } from './all_actions';

type Parameters = {
  title: any
  bootstrapStyle: any
  allFilters: any
  currentFilters: Set<string>
  onClick: (filter: string) => any
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
          {allFilters.map((filter: string) => (
            <Dropdown.Item onSelect={() => onClick(filter)} key={filter}>
              {(currentFilters.has(filter) ? '\u2713 ' : ' ') + filter}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <div>
        {Array.from(currentFilters).map(filter => (
          <Badge variant={bootstrapStyle} className="filter-pill" onClick={() => onClick(filter)} key={filter}>
            &#215;
            {' '}
            {filter}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default connect(null, allActions)(FilterMenu);
