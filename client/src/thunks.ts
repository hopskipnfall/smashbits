import { Dispatch, ActionCreator, Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { createBit as createBitApi, fetchBits as fetchBitsApi, fetchBit as fetchBitApi } from './api_client';
import { AppState } from "./store";
import { addBit, changeVote, replaceBits } from './store/bits/actions';
import { AddBitAction, ChangeVoteAction, ReplaceBitsAction } from './store/bits/types';
import { Bit, Vote, CharacterId } from "./types";
import { setMainCharacters } from "./store/filtering/actions";
import history from "./history";
import { buildUriFromState } from "./uri_util";

type AppThunkAction = ActionCreator<ThunkAction<Promise<void>, AppState, null, AnyAction>>

export const thunkFetchBits: AppThunkAction = () => {
  return async (dispatch, getState) => {
    console.log('dispatch', dispatch);
    const response = await fetchBitsApi()
    dispatch(replaceBits(response.bits));
  }
};

export const thunkFetchBit: AppThunkAction = (bitId: string) => {
  return async (dispatch, getState) => {
    console.log('getState', getState());
    const response = await fetchBitApi(bitId)
    dispatch(replaceBits([response.bit]));
  }
};

export const thunkSetMainChars: AppThunkAction = (characters: Set<CharacterId>) => {
  return async (dispatch, getState) => {
    dispatch(setMainCharacters(characters));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits);
  }
};


export function thunkPostBit(bit: Bit):
  ThunkAction<void, AppState, unknown, AddBitAction> {
  return async dispatch => {
    const resp = await createBitApi(bit, dispatch);
    if (!resp) {
      console.error('error apparently!');
    }

    // TODO: Make that request return the fully-formed bit and use that
    // instead of the one passed to this function.
    dispatch(addBit(bit));
  }
}

export function thunkChangeVote(bitId: string, vote: Vote):
  ThunkAction<void, AppState, unknown, ChangeVoteAction> {
  return async dispatch => {
    dispatch(changeVote(bitId, vote));

    // TODO: Make an API call.
  }
}
