import React from 'react';

export default function render(props) {
  const { title, bootstrapStyle, allFilters, currentFilters, onClick } = props;
  return (
    <div className="panel-body">
      <div className="dropdown">
        <button className={'btn btn-' + bootstrapStyle + ' dropdown-toggle'} type="button" data-toggle="dropdown">
          <span className="dropdown-caret-margin">
            {title}
          </span>
          <span className="caret" />
        </button>
        <div className="dropdown-menu">
          {allFilters.map(filter =>
              <div className='dropdown-option' key={Symbol.keyFor(filter)}>
                <div onClick={() => onClick(filter)}>
                  {(currentFilters.includes(filter) ? '\u2713 ' : ' ') + Symbol.keyFor(filter)}
                </div>
              </div>)}
        </div>
      </div>
      {currentFilters.map(filter =>
          <span className={'label label-' + bootstrapStyle + ' filter-pill'} onClick={() => onClick(filter)} key={Symbol.keyFor(filter)}>
            &#215; {Symbol.keyFor(filter)}
          </span>)}
    </div>
  );
};