import { ActionCreator, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { createBit as createBitApi, fetchBit as fetchBitApi, fetchBits as fetchBitsApi } from './api_client';
import history from "./history";
import { AppState } from "./store";
import { addBit, changeVote, replaceBits } from './store/bits/actions';
import { setLabels, setMainCharacters, setStages, setVsCharacters } from "./store/filtering/actions";
import { Bit, CharacterId, LabelId, StageId, Vote } from "./types";
import { buildUriFromState } from "./uri_util";

type AppThunkAction = ThunkAction<Promise<void>, AppState, null, AnyAction>
type AppThunkActionCreator = ActionCreator<AppThunkAction>

export const thunkFetchBits: AppThunkActionCreator = () => {
  return async (dispatch, getState) => {
    console.log('dispatch', dispatch);
    const response = await fetchBitsApi()
    dispatch(replaceBits(response.bits));
  }
};

export const thunkFetchBit: AppThunkActionCreator = (bitId: string) => {
  return async (dispatch, getState) => {
    console.log('getState', getState());
    const response = await fetchBitApi(bitId)
    dispatch(replaceBits([response.bit]));
  }
};

export const thunkSetMainChars: AppThunkActionCreator = (characters: Set<CharacterId>) => {
  return async (dispatch, getState) => {
    dispatch(setMainCharacters(characters));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits);
  }
};

export const thunkSetVsChars: AppThunkActionCreator = (characters: Set<CharacterId>) => {
  return async (dispatch, getState) => {
    dispatch(setVsCharacters(characters));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits);
  }
};

export const thunkSetStagesChars: AppThunkActionCreator = (stageIds: Set<StageId>) => {
  return async (dispatch, getState) => {
    dispatch(setStages(stageIds));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits);
  }
};

export const thunkSetLabels: AppThunkActionCreator = (labels: Set<LabelId>) => {
  return async (dispatch, getState) => {
    dispatch(setLabels(labels));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits);
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
