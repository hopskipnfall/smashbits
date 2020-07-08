import * as React from 'react';
import { Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import { AppFunctionComponent, AppState, NOOP } from './store';
import { Bit, CharacterId, LabelId, StageId } from './types';

type InputProps = {
  bit: Bit
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return { state };
}

const BitTagPills: AppFunctionComponent<InputProps, NOOP> = props => {
  const {
    bit,
    thunkSetMainChars,
    thunkSetVsChars,
    thunkSetStagesChars,
    thunkSetLabels,
  } = props;
  return (
    <div className="bit-tag-pills">
      {bit.mainChars.map(tag => (
        <Badge
          variant="success"
          className="filter-pill"
          onClick={() => { thunkSetMainChars(new Set([tag]) as Set<CharacterId>) }}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
      {bit.vsChars.map(tag => (
        <Badge
          variant="danger"
          className="filter-pill"
          onClick={() => thunkSetVsChars(new Set([tag]) as Set<CharacterId>)}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
      {bit.stages.map(tag => (
        <Badge
          variant="primary"
          className="filter-pill"
          onClick={() => thunkSetStagesChars(new Set([tag]) as Set<StageId>)}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
      {bit.standaloneTags.map(tag => (
        <Badge
          variant="warning"
          className="filter-pill"
          onClick={() => thunkSetLabels(new Set([tag]) as Set<LabelId>)}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

export default connect(mapStateToProps, allActions)(BitTagPills);
