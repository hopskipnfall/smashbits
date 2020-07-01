import * as Immutable from 'immutable';
import * as filters from './shared/filters';
import { setBitState } from './state';
import { Bit, Readonly, Vote } from './types';

// TODO(thenuge): Some of these constants should probably go elsewhere.
export const ACTION_CLEAR_BITS = 'ACTION_CLEAR_BITS';
export const ACTION_UPVOTE = 'ACTION_UPVOTE';
export const ACTION_DOWNVOTE = 'ACTION_DOWNVOTE';
export const ACTION_RESET_VOTE = 'ACTION_RESET_VOTE';
export const ACTION_ADD_BIT = 'ACTION_ADD_BIT';
export const ACTION_CHANGE_SORT = 'ACTION_CHANGE_SORT';
export const ACTION_REQUEST_COMMENTS = 'ACTION_REQUEST_COMMENTS';
export const ACTION_RECEIVE_COMMENTS = 'ACTION_RECEIVE_COMMENTS';
export const ACTION_REQUEST_CREATE_BIT = 'ACTION_REQUEST_CREATE_BIT';
export const ACTION_RECEIVE_CREATE_BIT = 'ACTION_RECEIVE_CREATE_BIT';
export const ACTION_SET_PROFILE = 'ACTION_SET_PROFILE';

export const USER_UPVOTE = 1;
export const USER_DOWNVOTE = -1;
export const USER_DEFAULT_VOTE = 0;

export const SORT_DATE = 'Date';
export const SORT_SCORE = 'Score';

export const DEFAULT_PAGE_SIZE = 25;

const INITIAL_STATE: any = Immutable.fromJS({
  bits: Immutable.OrderedMap(),
  sorts: [SORT_DATE, SORT_SCORE],
  filtering: {
    chars: [
      filters.FILTER_CHAR_LUIGI,
      filters.FILTER_CHAR_MARIO,
      filters.FILTER_CHAR_DK,
      filters.FILTER_CHAR_LINK,
      filters.FILTER_CHAR_SAMUS,
      filters.FILTER_CHAR_FALCON,
      filters.FILTER_CHAR_NESS,
      filters.FILTER_CHAR_YOSHI,
      filters.FILTER_CHAR_KIRBY,
      filters.FILTER_CHAR_FOX,
      filters.FILTER_CHAR_PIKA,
      filters.FILTER_CHAR_JIGGLY,
    ],
    stages: [
      filters.FILTER_STAGE_PEACH,
      filters.FILTER_STAGE_CONGO,
      filters.FILTER_STAGE_HYRULE,
      filters.FILTER_STAGE_ZEBES,
      filters.FILTER_STAGE_MUSHROOM,
      filters.FILTER_STAGE_DREAMLAND,
      filters.FILTER_STAGE_SECTOR_Z,
      filters.FILTER_STAGE_SAFFRON,
      filters.FILTER_STAGE_META_CRYSTAL,
      filters.FILTER_STAGE_YOSHI_ISLAND_19XX,
      filters.FILTER_STAGE_FINAL_DESTINATION,
      filters.FILTER_STAGE_BATTLEFIELD,
    ],
    standaloneTags: [
      filters.FILTER_TAG_APPROACH,
      filters.FILTER_TAG_EDGEGUARDING,
      filters.FILTER_TAG_COMBOS,
      filters.FILTER_TAG_ESCAPES,
    ],
  },
});

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case ACTION_CLEAR_BITS:
      return clearBits(state);
    case ACTION_ADD_BIT:
      return addBit(state, action.data);
    case ACTION_UPVOTE:
      return state.getIn(['bits', action.data, 'userVote']) === USER_UPVOTE
        ? resetVote(state, action.data)
        : upvote(state, action.data);
    case ACTION_DOWNVOTE:
      return state.getIn(['bits', action.data, 'userVote']) === USER_DOWNVOTE
        ? resetVote(state, action.data)
        : downvote(state, action.data);
    case ACTION_RESET_VOTE:
      return resetVote(state, action.data);
    case ACTION_CHANGE_SORT:
      return changeSort(state, action.data);
    case ACTION_REQUEST_COMMENTS:
      return setBitState(state, action.data).edit(bit => bit.isRequestingComments = true);
    case ACTION_RECEIVE_COMMENTS:
      return receiveComments(state, action.bitId, action.comments);
    case ACTION_REQUEST_CREATE_BIT:
      return state;
    case ACTION_RECEIVE_CREATE_BIT:
      return state;
    case ACTION_SET_PROFILE:
      return setProfile(state, action.data);
    default:
      return state;
  }
}

function clearBits(state = Immutable.Map<string, any>()) {
  return state.set('bits', Immutable.OrderedMap<string, Bit>());
}

function addBit(state = Immutable.Map<string, any>(), bit: Bit) {
  return setBitState(state, bit.postId).insert(bit);
}

function setVote(state = Immutable.Map<string, any>(), bitId: string, vote: Vote) {
  return setBitState(state, bitId).edit(bit => bit.userVote = vote);
}

const upvote = (state = Immutable.Map<string, any>(), bitId: string) => setVote(state, bitId, USER_UPVOTE);

const downvote = (state = Immutable.Map<string, any>(), bitId: string) => setVote(state, bitId, USER_DOWNVOTE);

const resetVote = (state = Immutable.Map<string, any>(), bitId: string) => setVote(state, bitId, USER_DEFAULT_VOTE);

const changeSort = (state = Immutable.Map<string, any>(), sort: string) => {
  switch (sort) {
    case SORT_SCORE:
      return state.set('bits',
        (state.get('bits', Immutable.OrderedMap()) as Immutable.OrderedMap<string, Readonly<Bit>>).sortBy(
          bit => -1 * (bit.upvotes - bit.downvotes + bit.userVote)
        ));
    case SORT_DATE:
      return state.set('bits',
        (state.get('bits', Immutable.OrderedMap()) as Immutable.OrderedMap<string, Readonly<Bit>>).sortBy(
          bit => -1 * bit.dateCreated
        ));
    default:
      return state;
  }
};

const setProfile = (state = Immutable.Map(), profile: any) => state.set('profile', profile);

function receiveComments(state = Immutable.Map<string, any>(), bitId: string, newComments: Immutable.Set<any>) {
  let stateWithComments = state.mergeIn(['comments'], Immutable.Map(newComments.map(comment => [comment.get('postId'), comment])));
  return setBitState(stateWithComments, bitId)
    .edit(bit => {
      bit.comments = bit.comments.union(newComments.map(comment => comment.get('postId')));
      bit.isRequestingComments = false;
    });
}
