import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { createBit as createBitApi, fetchBits as fetchBitsApi } from './api_client';
import { AppState } from "./store";
import { addBit, changeVote, replaceBits } from './store/bits/actions';
import { AddBitAction, ChangeVoteAction } from './store/bits/types';
import { Bit, Vote } from "./types";

export function thunkFetchBits() {
  return async (dispatch: Dispatch) => {
    const response = await fetchBitsApi()
    dispatch(replaceBits(response.bits));
  }
}

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
ThunkAction<void, AppState, unknown, ChangeVoteAction>  {
  return async dispatch => {
    dispatch(changeVote(bitId, vote));

    // TODO: Make an API call.
  }
}
