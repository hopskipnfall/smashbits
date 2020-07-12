import { Profile } from "../../types";
import { SetProfileAction, SET_PROFILE } from './types';

export const setProfile = (profile: Profile | null) => ({
  type: SET_PROFILE,
  profile,
} as SetProfileAction);
