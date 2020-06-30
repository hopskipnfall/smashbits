import * as React from 'react';
import { DropdownButton, Label, MenuItem } from 'react-bootstrap';

type Props = {
  title: any
   bootstrapStyle: any
   allFilters: any
   currentFilters: any
   onClick: (filter: string) => any
}

export default function render(props: Props) {
  const {
    title, bootstrapStyle, allFilters, currentFilters, onClick,
  } = props;
  return (
    <div className="panel-body">
      <DropdownButton bsStyle={bootstrapStyle} title={title} id={`filter-menu-${title}`}>
        {allFilters.map((filter: string) => (
          <MenuItem onSelect={() => onClick(filter)} key={filter}>
            {(currentFilters.includes(filter) ? '\u2713 ' : ' ') + filter}
          </MenuItem>
        ))}
      </DropdownButton>
      <div>
        {currentFilters.map((filter: string) => (
          <Label bsStyle={bootstrapStyle} className="filter-pill" onClick={() => onClick(filter)} key={filter}>
            &#215;
            {' '}
            {filter}
          </Label>
        ))}
      </div>
    </div>
  );
}
