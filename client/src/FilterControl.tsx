import * as React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import FilterMenu from './FilterMenu';
import { AppFunctionComponent, AppState } from './store';
import { ALL_CHARACTERS, ALL_LABELS, ALL_STAGES, CHARACTER_MAP_REVERSE, LABEL_MAP_REVERSE, STAGE_MAP_REVERSE } from './types';

type Parameters = {};

const mapStateToProps = (state: AppState, ownProps: Parameters) => ({
  filtering: state.filtering,
});

const FilterControl: AppFunctionComponent<Parameters, typeof mapStateToProps> = props => {
  const {
    filtering,
    thunkSetMainChars,
    thunkSetLabels,
    thunkSetVsChars,
    thunkSetStagesChars,
  } = props;
  return (
    <Card>
      <Card.Header><h2> Filtering Options </h2></Card.Header>
      <h4> Show me bits about: </h4>
      <FilterMenu
        title="These characters"
        bootstrapStyle="success"
        allFilters={ALL_CHARACTERS}
        currentFilters={new Set(Array.from(filtering.mainCharacters).map(name => CHARACTER_MAP_REVERSE.get(name)!))}
        onClick={thunkSetMainChars}
      />
      <FilterMenu
        title="vs. these characters"
        bootstrapStyle="danger"
        allFilters={ALL_CHARACTERS}
        currentFilters={new Set(Array.from(filtering.vsCharacters).map(name => CHARACTER_MAP_REVERSE.get(name)!))}
        onClick={thunkSetVsChars}
      />
      <FilterMenu
        title="on these stages"
        bootstrapStyle="primary"
        allFilters={ALL_STAGES}
        currentFilters={new Set(Array.from(filtering.stages).map(name => STAGE_MAP_REVERSE.get(name)!))}
        onClick={thunkSetStagesChars}
      />
      <FilterMenu
        title="with these tags"
        bootstrapStyle="warning"
        allFilters={ALL_LABELS}
        currentFilters={new Set(Array.from(filtering.labels).map(name => LABEL_MAP_REVERSE.get(name)!))}
        onClick={thunkSetLabels}
      />
    </Card>
  );
};

export default connect(mapStateToProps, allActions)(FilterControl);
