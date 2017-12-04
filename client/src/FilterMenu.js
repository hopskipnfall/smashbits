import React from 'react';
import { DropdownButton, MenuItem, Label } from 'react-bootstrap';

export default function render(props) {
  const { title, bootstrapStyle, allFilters, currentFilters, onClick } = props;
  return (
    <div className="panel-body">
      <DropdownButton bsStyle={bootstrapStyle} title={title} id={`filter-menu-${title}`}>
        {allFilters.map(filter =>
            <MenuItem onSelect={() => onClick(filter)} key={Symbol.keyFor(filter)}>
              {(currentFilters.includes(filter) ? '\u2713 ' : ' ') + Symbol.keyFor(filter)}
            </MenuItem>)}
      </DropdownButton>
      <div>
      {currentFilters.map(filter =>
          <Label bsStyle={bootstrapStyle} className="filter-pill" onClick={() => onClick(filter)} key={Symbol.keyFor(filter)}>
            &#215; {Symbol.keyFor(filter)}
          </Label>)}
      </div>
    </div>
  );
};