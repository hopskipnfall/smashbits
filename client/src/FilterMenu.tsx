import * as React from 'react';
import * as styles from './index.sass';
import { Badge, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import { AppFunctionComponent, NOOP } from './store';
import { FilterParameter } from './types';

type InputProps = {
  title: any;
  bootstrapStyle: any;
  allFilters: Set<FilterParameter>;
  currentFilters: Set<FilterParameter>;
  onClick: (filter: FilterParameter) => void;
};

const FilterMenu: AppFunctionComponent<InputProps, NOOP> = (props) => {
  const { title, bootstrapStyle, allFilters, currentFilters, onClick } = props;
  return (
    <div className={styles['filter-section']}>
      <Dropdown>
        <Dropdown.Toggle variant={bootstrapStyle} id="dropdown-basic">
          {title}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu">
          {Array.from(allFilters).map((filter) => (
            <Dropdown.Item onSelect={() => onClick(filter)} key={filter.id}>
              {(currentFilters.has(filter) ? '\u2713 ' : ' ') + filter.display}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <div>
        {Array.from(currentFilters).map((filter) => (
          <Badge
            variant={bootstrapStyle}
            className="filter-pill"
            onClick={() => onClick(filter)}
            key={filter.id}
          >
            &#215; {filter.display}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default connect(null, allActions)(FilterMenu);
