import { createReducer, on } from '@ngrx/store';
import {
  loadPhongbansFailure,
  loadPhongbansSuccess,
  createPhongbanFailure,
  createPhongbanSuccess,
  deletePhongbanFailure,
  deletePhongbanSuccess,
} from './phongban.action';
import { Phongban } from './phongban.model';

export interface PhongbanState {
  phongbans: Phongban[];
  error: string | null;
}

const initialState: PhongbanState = {
  phongbans: [],
  error: null,
};

export const phongbanReducer = createReducer(
  initialState,
  on(loadPhongbansSuccess, (state, { phongbans }) => ({
    ...state,
    phongbans,
    error: null,
  })),
  on(loadPhongbansFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(createPhongbanSuccess, (state, { phongban }) => ({
    ...state,
    phongbans: [...state.phongbans, phongban],
    error: null,
  })),
  on(createPhongbanFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(deletePhongbanSuccess, (state, { id }) => ({
    ...state,
    phongbans: state.phongbans.filter((phongban) => phongban.id !== id),
    error: null,
  })),
  on(deletePhongbanFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
