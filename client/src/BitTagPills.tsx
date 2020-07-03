import * as React from 'react';
import { Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppFunctionComponent, AppState, NOOP, wrapWithDispatch } from './store';
import { setMainCharacters, setVsCharacters } from './store/filtering/actions';
import { thunkFetchBits } from './thunks';
import { Bit, CharacterId } from './types';

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, null, AnyAction>) => ({
  fetchBits: wrapWithDispatch(thunkFetchBits, dispatch),

  setMainCharFilters: (charIds: Set<CharacterId>) => {
    dispatch(setMainCharacters(charIds));
    dispatch(thunkFetchBits);
  },

  setVsCharFilters: (charIds: Set<CharacterId>) => {
    dispatch(setVsCharacters(charIds));
    dispatch(thunkFetchBits);
  },
});

type InputProps = {
  bit: Bit
};

const BitTagPills: AppFunctionComponent<InputProps, NOOP, typeof mapDispatchToProps> = props => {
  const {
    bit,
    setMainCharFilters,
    setVsCharFilters,
    // setStageFilters,
    // setStandaloneTagFilters,
  } = props;
  return (
    <div className="bit-tag-pills">
      {bit.mainChars.map(tag => (
        <Badge
          variant="success"
          className="filter-pill"
          onClick={() => setMainCharFilters(new Set(tag) as Set<CharacterId>)}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
      {bit.vsChars.map(tag => (
        <Badge
          variant="danger"
          className="filter-pill"
          onClick={() => setVsCharFilters(new Set(tag) as Set<CharacterId>)}
          key={tag}
        >
          {tag}
        </Badge>
      ))}
      {/* {bit.stages.map(tag => (
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
      ))} */}
    </div>
  );
}

export default connect(null, mapDispatchToProps)(BitTagPills);
