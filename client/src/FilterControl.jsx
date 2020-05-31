import { fromJS, List, Map } from 'immutable';
import React from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from './action_creators';
import FilterMenu from './FilterMenu';

const FilterControl = props => {
  const { filtering = Map(), toggleMainCharFilter, toggleVsCharFilter, toggleStageFilter, toggleStandaloneTagFilter } = props;
  return (
    <Panel bsStyle="primary" header={<h2> Filtering Options </h2>}>
      <h4> Show me bits about: </h4>
      <FilterMenu
        title="These characters"
        bootstrapStyle="success"
        allFilters={filtering.get('chars')}
        currentFilters={filtering.get('currentMainChars', List())}
        onClick={toggleMainCharFilter} />
      <FilterMenu
        title="vs. these characters"
        bootstrapStyle="danger"
        allFilters={filtering.get('chars')}
        currentFilters={filtering.get('currentVsChars', List())}
        onClick={toggleVsCharFilter} />
      <FilterMenu
        title="on these stages"
        bootstrapStyle="primary"
        allFilters={filtering.get('stages')}
        currentFilters={filtering.get('currentStages', List())}
        onClick={toggleStageFilter} />
      <FilterMenu
        title="with these tags"
        bootstrapStyle="warning"
        allFilters={filtering.get('standaloneTags')}
        currentFilters={filtering.get('currentStandaloneTags', List())}
        onClick={toggleStandaloneTagFilter} />
    </Panel>
  );
};

const mapStateToProps = (state, ownProps) => ({
  filtering: state.get('filtering').merge(fromJS(ownProps.filters))
});

export default connect(mapStateToProps, actionCreators)(FilterControl);
