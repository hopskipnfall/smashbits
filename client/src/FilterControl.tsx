import { fromJS, List, Map } from 'immutable';
import * as React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import FilterMenu from './FilterMenu';
import { allActions } from './all_actions';
import { AppFunctionComponent, NOOP, AppState } from './store';
import { STAGE_MAP, CHARACTER_MAP, LABEL_MAP } from './types';

type Parameters = {};

const mapStateToProps = (state: AppState, ownProps: any) => ({
  filtering: state.filtering,
  // filtering: state.get('filtering').merge(fromJS(ownProps.filters)),
});

const FilterControl: AppFunctionComponent<Parameters, typeof mapStateToProps> = props => {
  const {
    filtering
    //  toggleMainCharFilter, toggleVsCharFilter, toggleStageFilter, toggleStandaloneTagFilter,
  } = props;
  return (
    <Card>
      <Card.Header><h2> Filtering Options </h2></Card.Header>
      <h4> Show me bits about: </h4>
      <FilterMenu
        title="These characters"
        bootstrapStyle="success"
        allFilters={Array.from(CHARACTER_MAP).map(r=> r[1].display)}
        currentFilters={filtering.mainCharacters}
        onClick={() => console.log("do toggleMainCharFilter!")}
        // onClick={toggleMainCharFilter}
      />
      <FilterMenu
        title="vs. these characters"
        bootstrapStyle="danger"
        allFilters={Array.from(CHARACTER_MAP).map(r=> r[1].display)}
        currentFilters={filtering.vsCharacters}
        onClick={() => console.log("do toggleVsCharFilter!")}
        // onClick={toggleVsCharFilter}
      />
      <FilterMenu
        title="on these stages"
        bootstrapStyle="primary"
        allFilters={Array.from(STAGE_MAP).map(r=> r[1].display)}
        currentFilters={filtering.stages}
        onClick={() => console.log("do toggleStageFilter!")}
        // onClick={toggleStageFilter}
      />
      <FilterMenu
        title="with these tags"
        bootstrapStyle="warning"
        allFilters={Array.from(LABEL_MAP).map(r=> r[1].display)}
        currentFilters={filtering.labels}
        onClick={() => console.log("do toggleStandaloneTagFilter!")}
        // onClick={toggleStandaloneTagFilter}
      />
    </Card>
  );
};

export default connect(mapStateToProps, allActions)(FilterControl);
