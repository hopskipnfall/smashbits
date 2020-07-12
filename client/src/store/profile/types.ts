import { Profile } from '../../types';

const PREFIX = 'PROFILE_';

export interface ProfileState {
  profile: Profile | null
}

export const SET_PROFILE = PREFIX + 'SET_PROFILE';
export interface SetProfileAction {
  type: typeof SET_PROFILE
  profile: Profile
}

export type ProfileActionTypes =
  | SetProfileAction;
