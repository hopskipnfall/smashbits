import * as React from 'react';
import { Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import * as styles from './index.sass';
import { AppFunctionComponent, AppState, NOOP } from './store';
import { Bit } from './types';

type InputProps = {
  bit: Bit;
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return { state };
};

const BitTagPills: AppFunctionComponent<InputProps, NOOP> = (props) => {
  const {
    bit,
    thunkSetMainChars,
    thunkSetVsChars,
    thunkSetStages,
    thunkSetLabels,
  } = props;
  return (
    <div className={styles['bit-tag-pills']}>
      {bit.mainChars.map((tag) => (
        <Badge
          variant="success"
          className={styles['filter-pill']}
          onClick={() => {
            thunkSetMainChars(new Set([tag]));
          }}
          key={tag.id}
        >
          {tag.display}
        </Badge>
      ))}
      {bit.vsChars.map((tag) => (
        <Badge
          variant="danger"
          className={styles['filter-pill']}
          onClick={() => {
            thunkSetVsChars(new Set([tag]));
          }}
          key={tag.id}
        >
          {tag.display}
        </Badge>
      ))}
      {bit.stages.map((tag) => (
        <Badge
          variant="primary"
          className={styles['filter-pill']}
          onClick={() => {
            thunkSetStages(new Set([tag]));
          }}
          key={tag.id}
        >
          {tag.display}
        </Badge>
      ))}
      {bit.standaloneTags.map((tag) => (
        <Badge
          variant="warning"
          className={styles['filter-pill']}
          onClick={() => {
            thunkSetLabels(new Set([tag]));
          }}
          key={tag.id}
        >
          {tag.display}
        </Badge>
      ))}
    </div>
  );
};

export default connect(mapStateToProps, allActions)(BitTagPills);
