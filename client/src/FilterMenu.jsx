import React from 'react';
import { DropdownButton, Label, MenuItem } from 'react-bootstrap';

export default function render(props) {
  const { title, bootstrapStyle, allFilters, currentFilters, onClick } = props;
  return (
    <div className="panel-body">
      <DropdownButton bsStyle={bootstrapStyle} title={title} id={`filter-menu-${title}`}>
        {allFilters.map(filter =>
          <MenuItem onSelect={() => onClick(filter)} key={filter}>
            {(currentFilters.includes(filter) ? '\u2713 ' : ' ') + filter}
          </MenuItem>)}
      </DropdownButton>
      <div>
        {currentFilters.map(filter =>
          <Label bsStyle={bootstrapStyle} className="filter-pill" onClick={() => onClick(filter)} key={filter}>
            &#215; {filter}
          </Label>)}
      </div>
    </div>
  );
};
