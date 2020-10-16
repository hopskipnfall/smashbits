import * as React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import FilterMenu from './FilterMenu';
import { AppFunctionComponent, AppState } from './store';
import { ALL_CHARACTERS, ALL_LABELS, ALL_STAGES } from './types';

type Parameters = {};

const mapStateToProps = (state: AppState, ownProps: Parameters) => ({
  filtering: state.filtering,
});

const FilterControl: AppFunctionComponent<
  Parameters,
  typeof mapStateToProps
> = (props) => {
  const {
    filtering,
    thunkToggleMainChar,
    thunkToggleVsChar,
    thunkToggleLabel,
    thunkToggleStage,
  } = props;
  return (
    <Card>
      <Card.Header>
        <h2> Filtering Options </h2>
      </Card.Header>
      <h4> Show me bits about: </h4>
      <FilterMenu
        title="These characters"
        bootstrapStyle="success"
        allFilters={ALL_CHARACTERS}
        currentFilters={filtering.mainCharacters}
        onClick={thunkToggleMainChar}
      />
      <FilterMenu
        title="vs. these characters"
        bootstrapStyle="danger"
        allFilters={ALL_CHARACTERS}
        currentFilters={filtering.vsCharacters}
        onClick={thunkToggleVsChar}
      />
      <FilterMenu
        title="on these stages"
        bootstrapStyle="primary"
        allFilters={ALL_STAGES}
        currentFilters={filtering.stages}
        onClick={thunkToggleStage}
      />
      <FilterMenu
        title="with these tags"
        bootstrapStyle="warning"
        allFilters={ALL_LABELS}
        currentFilters={filtering.labels}
        onClick={thunkToggleLabel}
      />
    </Card>
  );
};

export default connect(mapStateToProps, allActions)(FilterControl);
