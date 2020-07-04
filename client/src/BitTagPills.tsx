import * as React from 'react';
import { Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppFunctionComponent, AppState, NOOP, wrapThunkWithDispatch, AppComponent, wrapWithDispatch } from './store';
import { setMainCharacters, setVsCharacters, setStages, setLabels } from './store/filtering/actions';
import { thunkFetchBits, thunkSetMainChars } from './thunks';
import { Bit, CharacterId, StageId, LabelId } from './types';
import { buildUriFromState } from './uri_util';
import history from './history';

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {state};
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, null, AnyAction>) => ({
  dispatchers: {
    fetchBits: wrapThunkWithDispatch(thunkFetchBits, dispatch),
    setMainCharFilters: wrapThunkWithDispatch(thunkSetMainChars, dispatch),
    setVsCharacters: wrapWithDispatch(setVsCharacters, dispatch),
    setStages: wrapWithDispatch(setStages, dispatch),
    setLabels: wrapWithDispatch(setLabels, dispatch),
  },
});

type InputProps = {
  bit: Bit
};

class BitTagPills extends AppComponent<InputProps, typeof mapStateToProps, typeof mapDispatchToProps> {

  private getState() {
    return this.props.state;
  }

  private setVsCharFilters(charIds: Set<CharacterId>) {
    const dispatchers = this.props.dispatchers;
    dispatchers.setVsCharacters(charIds);
    history.push(buildUriFromState(this.props.state));
    dispatchers.fetchBits();
  }

  private setStageFilters(stageIds: Set<StageId>) {
    const dispatchers = this.props.dispatchers;
    dispatchers.setStages(stageIds);
    history.push(buildUriFromState(this.props.state));
    dispatchers.fetchBits();
  }

  private setStandaloneTagFilters(labels: Set<LabelId>) {
    const dispatchers = this.props.dispatchers;
    dispatchers.setLabels(labels);
    history.push(buildUriFromState(this.getState()));
    dispatchers.fetchBits();
  }

  render() {
    const {
      bit,
    } = this.props;
    return (
      <div className="bit-tag-pills">
        {bit.mainChars.map(tag => (
          <Badge
            variant="success"
            className="filter-pill"
            onClick={() => {this.props.dispatchers.setMainCharFilters(new Set([tag]) as Set<CharacterId>)}}
            key={tag}
          >
            {tag}
          </Badge>
        ))}
        {bit.vsChars.map(tag => (
          <Badge
            variant="danger"
            className="filter-pill"
            onClick={() => this.setVsCharFilters(new Set([tag]) as Set<CharacterId>)}
            key={tag}
          >
            {tag}
          </Badge>
        ))}
        {bit.stages.map(tag => (
          <Badge
            variant="primary"
            className="filter-pill"
            onClick={() => this.setStageFilters(new Set([tag]) as Set<StageId>)}
            key={tag}
          >
            {tag}
          </Badge>
        ))}
        {bit.standaloneTags.map(tag => (
          <Badge
            variant="warning"
            className="filter-pill"
            onClick={() => this.setStandaloneTagFilters(new Set([tag]) as Set<LabelId>)}
            key={tag}
          >
            {tag}
          </Badge>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BitTagPills);
