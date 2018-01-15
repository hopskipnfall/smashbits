import { Map, Set, fromJS } from 'immutable';

window.fromJS = fromJS;

// TODO(thenuge): Some of these constants should probably go elsewhere.
export const ACTION_UPVOTE = Symbol('ACTION_UPVOTE');
export const ACTION_DOWNVOTE = Symbol('ACTION_DOWNVOTE');
export const ACTION_RESET_VOTE = Symbol('ACTION_RESET_VOTE');
export const ACTION_ADD_BIT = Symbol('ACTION_ADD_BIT');
export const ACTION_CHANGE_SORT = Symbol('ACTION_CHANGE_SORT');
export const ACTION_TOGGLE_MAIN_CHAR_FILTER = Symbol('ACTION_TOGGLE_MAIN_CHAR_FILTER');
export const ACTION_TOGGLE_VS_CHAR_FILTER = Symbol('ACTION_TOGGLE_VS_CHAR_FILTER');
export const ACTION_TOGGLE_STAGE_FILTER = Symbol('ACTION_TOGGLE_STAGE_FILTER');
export const ACTION_TOGGLE_STANDALONE_TAG_FILTER = Symbol('ACTION_TOGGLE_STANDALONE_TAG_FILTER');

export const USER_UPVOTE = 1;
export const USER_DOWNVOTE = -1;
export const USER_DEFAULT_VOTE = 0;

export const SORT_DATE = Symbol.for('Date');
export const SORT_SCORE = Symbol.for('Score');

export const FILTER_CHAR_LUIGI = Symbol.for('Luigi');
export const FILTER_CHAR_MARIO = Symbol.for('Mario');
export const FILTER_CHAR_DK = Symbol.for('Donkey Kong');
export const FILTER_CHAR_LINK = Symbol.for('Link');
export const FILTER_CHAR_SAMUS = Symbol.for('Samus');
export const FILTER_CHAR_FALCON = Symbol.for('Captain Falcon');
export const FILTER_CHAR_NESS = Symbol.for('Ness');
export const FILTER_CHAR_YOSHI = Symbol.for('Yoshi');
export const FILTER_CHAR_KIRBY = Symbol.for('Kirby');
export const FILTER_CHAR_FOX = Symbol.for('Fox');
export const FILTER_CHAR_PIKA = Symbol.for('Pikachu');
export const FILTER_CHAR_JIGGLY = Symbol.for('Jigglypuff');

export const FILTER_STAGE_PEACH = Symbol.for('Peach\'s Castle');
export const FILTER_STAGE_CONGO = Symbol.for('Congo Jungle');
export const FILTER_STAGE_HYRULE = Symbol.for('Hyrule Castle');
export const FILTER_STAGE_ZEBES = Symbol.for('Planet Zebes');
export const FILTER_STAGE_MUSHROOM = Symbol.for('Mushroom Kingdom');
export const FILTER_STAGE_DREAMLAND = Symbol.for('Dream Land');
export const FILTER_STAGE_SECTOR_Z = Symbol.for('Sector Z');
export const FILTER_STAGE_SAFFRON = Symbol.for('Saffron City');
export const FILTER_STAGE_META_CRYSTAL = Symbol.for('Meta Crystal (19xx)');
export const FILTER_STAGE_YOSHI_ISLAND_19XX = Symbol.for('Yoshi\'s Island (19xx)');
export const FILTER_STAGE_FINAL_DESTINATION = Symbol.for('Final Destination (19xx)');
export const FILTER_STAGE_BATTLEFIELD = Symbol.for('Battlefield (19xx)');

export const FILTER_TAG_APPROACH = Symbol.for('Approach');
export const FILTER_TAG_EDGEGUARDING = Symbol.for('Edgeguarding');
export const FILTER_TAG_COMBOS = Symbol.for('Combos');
export const FILTER_TAG_ESCAPES = Symbol.for('Escapes');

const INITIAL_STATE = fromJS({
  sorting: {
    sorts: [SORT_DATE, SORT_SCORE],
    currentSort: SORT_SCORE
  },
  filtering: {
    chars: [
        FILTER_CHAR_LUIGI,
        FILTER_CHAR_MARIO,
        FILTER_CHAR_DK,
        FILTER_CHAR_LINK,
        FILTER_CHAR_SAMUS,
        FILTER_CHAR_FALCON,
        FILTER_CHAR_NESS,
        FILTER_CHAR_YOSHI,
        FILTER_CHAR_KIRBY,
        FILTER_CHAR_FOX,
        FILTER_CHAR_PIKA,
        FILTER_CHAR_JIGGLY
    ],
    currentMainChars: Set(),
    currentVsChars: Set(),
    stages: [
        FILTER_STAGE_PEACH,
        FILTER_STAGE_CONGO,
        FILTER_STAGE_HYRULE,
        FILTER_STAGE_ZEBES,
        FILTER_STAGE_MUSHROOM,
        FILTER_STAGE_DREAMLAND,
        FILTER_STAGE_SECTOR_Z,
        FILTER_STAGE_SAFFRON,
        FILTER_STAGE_META_CRYSTAL,
        FILTER_STAGE_YOSHI_ISLAND_19XX,
        FILTER_STAGE_FINAL_DESTINATION,
        FILTER_STAGE_BATTLEFIELD
    ],
    currentStages: Set(),
    standaloneTags: [
        FILTER_TAG_APPROACH,
        FILTER_TAG_EDGEGUARDING,
        FILTER_TAG_COMBOS,
        FILTER_TAG_ESCAPES
    ],
    currentStandaloneTags: Set()
  }
})

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
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
    case ACTION_TOGGLE_MAIN_CHAR_FILTER:
      return toggleMainChar(state, action.data);
    case ACTION_TOGGLE_VS_CHAR_FILTER:
      return toggleVsChar(state, action.data);
    case ACTION_TOGGLE_STAGE_FILTER:
      return toggleStage(state, action.data);
    case ACTION_TOGGLE_STANDALONE_TAG_FILTER:
      return toggleStandaloneTag(state, action.data);
    default:
      return state;
  }
}

const addBit = (state = Map(), bit) => state.setIn(['bits', bit.get('id')], bit);

const upvote = (state = Map(), bitId) =>
    resetVote(state, bitId)
        .setIn(['bits', bitId, 'userVote'], USER_UPVOTE);

const downvote = (state = Map(), bitId) =>
    resetVote(state, bitId)
        .setIn(['bits', bitId, 'userVote'], USER_DOWNVOTE);

const resetVote = (state = Map(), bitId) => state
    .setIn(['bits', bitId, 'userVote'], USER_DEFAULT_VOTE);

const changeSort = (state = Map(), sort) => {
  switch (sort) {
    case SORT_SCORE:
      return state.set('bits',
          state.get('bits', Map()).sortBy(
              bit => -1 * (bit.get('upvotes', 0) - bit.get('downvotes', 0) + bit.get('userVote', 0))))
          .setIn(['sorting', 'currentSort'], sort);
    case SORT_DATE:
      return state.set('bits',
          state.get('bits', Map()).sortBy(
              bit => -1 * bit.get('date_created', 0)))
          .setIn(['sorting', 'currentSort'], sort);
    default:
      return state;
  }
};

const toggleMainChar = (state = Map(), char) =>
    state.setIn(['filtering', 'currentMainChars'],
        toggleSetElement(state.getIn(['filtering', 'currentMainChars']), char));

const toggleVsChar = (state = Map(), char) =>
    state.setIn(['filtering', 'currentVsChars'],
        toggleSetElement(state.getIn(['filtering', 'currentVsChars']), char));

const toggleStage = (state = Map(), stage) =>
    state.setIn(['filtering', 'currentStages'],
        toggleSetElement(state.getIn(['filtering', 'currentStages']), stage));

const toggleStandaloneTag = (state = Map(), tag) =>
    state.setIn(['filtering', 'currentStandaloneTags'],
        toggleSetElement(state.getIn(['filtering', 'currentStandaloneTags']), tag));

const toggleSetElement = (set, element) => set.includes(element) ? set.delete(element) : set.add(element);