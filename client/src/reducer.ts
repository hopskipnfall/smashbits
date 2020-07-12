// export const ACTION_CHANGE_SORT = 'ACTION_CHANGE_SORT';
// export const ACTION_REQUEST_COMMENTS = 'ACTION_REQUEST_COMMENTS';
// export const ACTION_RECEIVE_COMMENTS = 'ACTION_RECEIVE_COMMENTS';

// export default function (state = INITIAL_STATE, action: any) {
//   switch (action.type) {
//     case ACTION_CHANGE_SORT:
//       return changeSort(state, action.data);
//     case ACTION_REQUEST_COMMENTS:
//       return setBitState(state, action.data).edit(bit => bit.isRequestingComments = true);
//     case ACTION_RECEIVE_COMMENTS:
//       return receiveComments(state, action.bitId, action.comments);
//     default:
//       return state;
//   }
// }

// const setProfile = (state = Immutable.Map(), profile: any) => state.set('profile', profile);

// function receiveComments(state = Immutable.Map<string, any>(), bitId: string, newComments: Immutable.Set<any>) {
//   const stateWithComments = state.mergeIn(['comments'], Immutable.Map(newComments.map(comment => [comment.get('postId'), comment])));
//   return setBitState(stateWithComments, bitId)
//     .edit(bit => {
//       bit.comments = bit.comments.union(newComments.map(comment => comment.get('postId')));
//       bit.isRequestingComments = false;
//     });
// }
