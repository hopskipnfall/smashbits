import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as styles from './Bit.sass';
// import BitTagPills from './BitTagPills';
import { Bit as BitType, Vote } from './types';
import { FunctionComponent } from 'react';
import { VOTE_UP, VOTE_DOWN } from './store/bits/types';
import { PropsFromRedux, AppState } from './store';
import { thunkChangeVote } from './thunks';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, null, AnyAction>) => ({
  changeVote: (bitId: string, vote: Vote) => dispatch(thunkChangeVote(bitId, vote)),
});

type InputProps = ReturnType<typeof mapDispatchToProps> & PropsFromRedux & {
  bit: BitType
};

const getDownvoteButtonStyle = (bit: BitType) => (bit.userVote === VOTE_DOWN ? 'danger' : 'primary');
const getUpvoteButtonStyle = (bit: BitType) => (bit.userVote === VOTE_UP ? 'success' : 'primary');

const Bit: FunctionComponent<InputProps> = props => {
  const { bit, changeVote } = props;
  const header = (
    <h3>
      <Button variant={getUpvoteButtonStyle(bit)} className="thumbs-up-button" onClick={() => changeVote(bit.postId, VOTE_UP)}>
        <span className="glyphicon glyphicon-thumbs-up" />
      </Button>
      {bit.upvotes - bit.downvotes + bit.userVote}
      <Button variant={getDownvoteButtonStyle(bit)} className="thumbs-down-button" onClick={() => changeVote(bit.postId, VOTE_DOWN)}>
        <span className="glyphicon glyphicon-thumbs-down" />
      </Button>
      <span className={styles.title}>{bit.title}</span>
    </h3>
  );
  return (
    <Card>
      <Card.Header>{header}</Card.Header>
      <div>
        {/* <BitTagPills bit={bit} {...props} /> */}
        <p>
          <b>{bit.author.name}</b>
          {' '}
          •
          {' '}
          <i>{new Date(bit.dateCreated).toDateString()}</i>
        </p>
        {bit.content}
        <p>
          <Link to={`/bits/${bit.postId}`}>permalink</Link>
        </p>
      </div>
    </Card>
  );
}

export default connect(null, mapDispatchToProps)(Bit);
