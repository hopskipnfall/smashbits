import { ActionCreator, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { apiCreateBit as createBitApi, apiFetchBit as fetchBitApi, apiFetchBits as fetchBitsApi, apiFetchProfile } from './api_client';
import history from "./history";
import { AppState } from "./store";
import { addBit, changeVote, replaceBits } from './store/bits/actions';
import { changeSort, setLabels, setMainCharacters, setPageSize, setStages, setVsCharacters } from "./store/filtering/actions";
import { setProfile } from "./store/profile/actions";
import { Bit, CharacterId, LabelId, PageSize, SortOption, StageId, Vote } from "./types";
import { buildUriFromState } from "./uri_util";

type AppThunkAction = ThunkAction<Promise<void>, AppState, null, AnyAction>
type AppThunkActionCreator = ActionCreator<AppThunkAction>

export const thunkFetchBits: AppThunkActionCreator = () => {
  return async (dispatch, getState) => {
    const response = await fetchBitsApi(getState().filtering)
    dispatch(replaceBits(response.bits));
  }
};

export const thunkFetchBit: AppThunkActionCreator = (bitId: string) => {
  return async (dispatch, getState) => {
    const response = await fetchBitApi(bitId)
    dispatch(replaceBits([response.bit]));
  }
};

export const thunkSetMainChars: AppThunkActionCreator = (characters: Set<CharacterId>) => {
  return async (dispatch, getState) => {
    dispatch(setMainCharacters(characters));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits());
  }
};

export const thunkSetVsChars: AppThunkActionCreator = (characters: Set<CharacterId>) => {
  return async (dispatch, getState) => {
    dispatch(setVsCharacters(characters));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits());
  }
};

export const thunkSetStagesChars: AppThunkActionCreator = (stageIds: Set<StageId>) => {
  return async (dispatch, getState) => {
    dispatch(setStages(stageIds));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits());
  }
};

export const thunkSetLabels: AppThunkActionCreator = (labels: Set<LabelId>) => {
  return async (dispatch, getState) => {
    dispatch(setLabels(labels));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits());
  }
};

export const thunkPostBit: AppThunkActionCreator = (bit: Bit) => {
  return async (dispatch, getState) => {
    const resp = await createBitApi(bit, dispatch);
    if (!resp) {
      console.error('error apparently!');
    }

    // TODO: Make that request return the fully-formed bit and use that
    // instead of the one passed to this function.
    dispatch(addBit(bit));
  }
};

export const thunkChangeVote: AppThunkActionCreator = (bitId: string, vote: Vote) => {
  return async (dispatch, getState) => {
    dispatch(changeVote(bitId, vote));

    // TODO: Make an API call.
  }
};

export const thunkFetchProfile: AppThunkActionCreator = () => {
  return async (dispatch, getState) => {
    if (getState().profile.profile) {
      return;
    }
    const response = await apiFetchProfile();
    dispatch(setProfile(response));
  }
};

export const thunkChangeSort: AppThunkActionCreator = (sort: SortOption) => {
  return async (dispatch, getState) => {
    dispatch(changeSort(sort));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits());
  }
};

export const thunkChangePageSize: AppThunkActionCreator = (size: PageSize) => {
  return async (dispatch, getState) => {
    dispatch(setPageSize(size));
    // TODO: IDK if this is necessary and stuff.
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits());
  }
};
