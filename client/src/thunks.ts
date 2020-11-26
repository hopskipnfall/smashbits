import * as _ from 'lodash';
import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  apiCreateBit as createBitApi,
  apiFetchBit as fetchBitApi,
  apiFetchBits as fetchBitsApi,
  apiFetchProfile,
} from './api_client';
import { decorateBit } from './bits_util';
import history from './history';
import { AppState } from './store';
import {
  addOptimisticBit,
  changeVote,
  replaceBits,
  setOptimisticBitStatus,
} from './store/bits/actions';
import {
  changeSort,
  setLabels,
  setMainCharacters,
  setOffset,
  setPageSize,
  setStages,
  setVsCharacters,
} from './store/filtering/actions';
import { setProfile } from './store/profile/actions';
import {
  Bit,
  Character,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT,
  Label,
  PageSize,
  SortOption,
  Stage,
  Status,
  Vote,
} from './types';
import {
  buildUriFromState,
  getDisplayQueryParams,
  getOffset,
  getPageSize,
} from './uri_util';

type AppThunkAction = ThunkAction<Promise<void>, AppState, null, AnyAction>;
type AppThunkActionCreator = ActionCreator<AppThunkAction>;

export const thunkFetchBits: AppThunkActionCreator = () => {
  return async (dispatch, getState) => {
    const bits = await fetchBitsApi(getState().filtering);
    dispatch(replaceBits(bits));
  };
};

export const thunkFetchBit: AppThunkActionCreator = (bitId: string) => {
  return async (dispatch, getState) => {
    const response = await fetchBitApi(bitId);
    dispatch(replaceBits([response.bit]));
  };
};

export const thunkFetchNextPage: AppThunkActionCreator = () => {
  return async (dispatch, getState) => {
    const offset =
      (getOffset(history.location.search) || 0) +
      (getPageSize(history.location.search) || DEFAULT_PAGE_SIZE);
    dispatch(setOffset(offset));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits());
  };
};

export const thunkFetchPreviousPage: AppThunkActionCreator = () => {
  return async (dispatch, getState) => {
    const offset = Math.max(
      0,
      (getOffset(history.location.search) || 0) -
        (getPageSize(history.location.search) || DEFAULT_PAGE_SIZE),
    );
    dispatch(setOffset(offset));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits());
  };
};

export const thunkToggleMainChar: AppThunkActionCreator = (char: Character) => {
  return async (dispatch, getState) => {
    dispatch(
      thunkSetMainChars(
        new Set(_.xor(Array.from(getState().filtering.mainCharacters), [char])),
      ),
    );
  };
};

export const thunkSetMainChars: AppThunkActionCreator = (
  characters: Set<Character>,
) => {
  return async (dispatch, getState) => {
    dispatch(setMainCharacters(characters));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits());
  };
};

export const thunkToggleVsChar: AppThunkActionCreator = (char: Character) => {
  return async (dispatch, getState) => {
    dispatch(
      thunkSetVsChars(
        new Set(_.xor(Array.from(getState().filtering.vsCharacters), [char])),
      ),
    );
  };
};

export const thunkSetVsChars: AppThunkActionCreator = (
  characters: Set<Character>,
) => {
  return async (dispatch, getState) => {
    dispatch(setVsCharacters(characters));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits());
  };
};

export const thunkToggleStage: AppThunkActionCreator = (stageId: Stage) => {
  return async (dispatch, getState) => {
    dispatch(
      thunkSetStages(
        new Set(_.xor(Array.from(getState().filtering.stages), [stageId])),
      ),
    );
  };
};

export const thunkSetStages: AppThunkActionCreator = (stageIds: Set<Stage>) => {
  return async (dispatch, getState) => {
    dispatch(setStages(stageIds));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits());
  };
};

export const thunkToggleLabel: AppThunkActionCreator = (labelId: Label) => {
  return async (dispatch, getState) => {
    dispatch(
      thunkSetLabels(
        new Set(_.xor(Array.from(getState().filtering.labels), [labelId])),
      ),
    );
  };
};

export const thunkSetLabels: AppThunkActionCreator = (labels: Set<Label>) => {
  return async (dispatch, getState) => {
    dispatch(setLabels(labels));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits());
  };
};

export const thunkPostBit: AppThunkActionCreator = (bit: Bit) => {
  return async (dispatch, getState) => {
    createBitApi(bit, dispatch)
      .then((res) => dispatch(setOptimisticBitStatus(bit.postId, Status.Saved)))
      .catch((e) => {
        console.error('error apparently!', e);
        dispatch(setOptimisticBitStatus(bit.postId, Status.Error));
      });

    const optimisticBit = decorateBit(bit);
    optimisticBit.status = Status.Saving;
    dispatch(addOptimisticBit(optimisticBit));
  };
};

export const thunkChangeVote: AppThunkActionCreator = (
  bitId: string,
  vote: Vote,
) => {
  return async (dispatch, getState) => {
    dispatch(changeVote(bitId, vote));

    // TODO: Make an API call.
  };
};

export const thunkFetchProfile: AppThunkActionCreator = () => {
  return async (dispatch, getState) => {
    if (getState().profile.profile) {
      return;
    }
    const response = await apiFetchProfile();
    dispatch(setProfile(response));
  };
};

export const thunkChangeSort: AppThunkActionCreator = (sort: SortOption) => {
  return async (dispatch, getState) => {
    dispatch(changeSort(sort));
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits());
  };
};

export const thunkChangePageSize: AppThunkActionCreator = (size: PageSize) => {
  return async (dispatch, getState) => {
    dispatch(setPageSize(size));
    // TODO: IDK if this is necessary and stuff.
    history.push(buildUriFromState(getState()));
    dispatch(thunkFetchBits());
  };
};

export const thunkSetStateFromUrlBar: AppThunkActionCreator = () => {
  return async (dispatch) => {
    const params = getDisplayQueryParams(history.location.search);
    dispatch(setPageSize(params.pageSize ?? DEFAULT_PAGE_SIZE));
    dispatch(setOffset(params.offset ?? 0));
    dispatch(changeSort(params.sort ?? DEFAULT_SORT));
    dispatch(setMainCharacters(params.mainChars ?? new Set()));
    dispatch(setVsCharacters(params.vsChars ?? new Set()));
    dispatch(setStages(params.stages ?? new Set()));
    dispatch(setLabels(params.standaloneTags ?? new Set()));
  };
};
