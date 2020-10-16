import { ProfileActionTypes, ProfileState, SET_PROFILE } from './types';

const initialState: ProfileState = {
  profile: null,
};

export function profileReducer(
  state = initialState,
  action: ProfileActionTypes,
): ProfileState {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return state;
  }
}
