import { Set } from 'immutable';
import * as React from 'react';
import { Badge } from 'react-bootstrap';
// import { setMainCharFilters, setStageFilters, setStandaloneTagFilters, setVsCharFilters } from './action_creators';
import { Bit } from './types';
import { FunctionComponent } from 'react';
import { PropsFromRedux, AppFunctionComponent, NOOP, AppState } from './store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';


const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, null, AnyAction>) => ({
  // setMainCharFilters: ()
  changeVote: (bitId: string, vote: Vote) => dispatch(thunkChangeVote(bitId, vote)),
});

type InputProps = {
  bit: Bit
};

const BitTagPills: AppFunctionComponent<InputProps, NOOP, NOOP> = props => {
  const {
    bit,
    setMainCharFilters,
    setVsCharFilters,
    setStageFilters,
    setStandaloneTagFilters,
  } = props;
  return (
    <div className="bit-tag-pills">
      {bit.mainChars.map(tag => (
        <Badge
          variant="success"
          className="filter-pill"
          onClick={() => setMainCharFilters(Set.of(tag))}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
      {bit.vsChars.map(tag => (
        <Badge
          variant="danger"
          className="filter-pill"
          onClick={() => setVsCharFilters(Set.of(tag))}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
      {bit.stages.map(tag => (
        <Badge
          variant="primary"
          className="filter-pill"
          onClick={() => setStageFilters(Set.of(tag))}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
      {bit.standaloneTags.map(tag => (
        <Badge
          variant="warning"
          className="filter-pill"
          onClick={() => setStandaloneTagFilters(Set.of(tag))}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

export default BitTagPills;
