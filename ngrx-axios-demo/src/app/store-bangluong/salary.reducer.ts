import { createReducer, on } from '@ngrx/store';
import { Bangluong } from './salary.model';
import {
  loadBangluongsSuccess,
  loadBangluongsFailure,
  createBangluongSuccess,
  createBangluongFailure,
  deleteBangluongSuccess,
  deleteBangluongFailure,
  updateBangluongFailure,
  updateBangluongSuccess,
  searchBangluongsSuccess,
  searchBangluongsFailure,
} from './salary.actions';
export interface BangluongState {
  bangluongs: Bangluong[];
  error: string | null;
}

const initialState: BangluongState = {
  bangluongs: [],
  error: null,
};

export const bangluongReducer = createReducer(
  initialState,
  on(loadBangluongsSuccess, (state, { bangluongs }) => ({
    ...state,
    bangluongs,
    error: null,
  })),
  on(loadBangluongsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(createBangluongSuccess, (state, { bangluong }) => ({
    ...state,
    bangluongs: [...state.bangluongs, bangluong],
    error: null,
  })),
  on(createBangluongFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(deleteBangluongSuccess, (state, { id }) => ({
    ...state,
    bangluongs: state.bangluongs.filter((bangluong) => bangluong.id !== id),
    error: null,
  })),
  on(deleteBangluongFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(updateBangluongSuccess, (state, { bangluong }) => ({
    ...state,
    bangluongs: state.bangluongs.map((b) =>
      b.id === bangluong.id ? bangluong : b
    ),
    error: null,
  })),
  on(updateBangluongFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(searchBangluongsSuccess, (state, { bangluongs }) => ({
    ...state,
    bangluongs,
    error: null,
  })),
  on(searchBangluongsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
