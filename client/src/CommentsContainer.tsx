import * as Immutable from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import { AppFunctionComponent, NOOP } from './store';
import { Bit, Comment } from './types';

type InputProps = {
  bit: Bit;
  comments: Immutable.Map<string, Comment>;
};

// NOTE: This component isn't used anywhere yet, who knows if it works.

const CommentsContainer: AppFunctionComponent<InputProps, NOOP> = (props) => {
  const { bit, comments } = props;
  return (
    <div>
      {bit.comments.map((id) => {
        const comment = comments.get(id, new Comment());
        return (
          <div key={id}>
            <p>
              <b>{`${comment.author.name} • `}</b>
              <i>{new Date(comment.dateCreated).toDateString()}</i>
            </p>
            {comment.content}
          </div>
        );
      })}
    </div>
  );
};

export default connect(null, allActions)(CommentsContainer);
