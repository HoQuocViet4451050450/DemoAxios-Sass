import { createReducer, on } from '@ngrx/store';
import {
  loadNguoidungsSuccess,
  loadNguoidungsFailure,
  createNguoidungSuccess,
  createNguoidungFailure,
  deleteNguoidungSuccess,
  deleteNguoidungFailure,
  updateNguoidungSuccess,
  updateNguoidungFailure,
  searchNguoidungsSuccess,
  searchNguoidungsFailure,
} from './nguoidung.actions';
import { Nguoidung } from './nguoidung.model';

export interface NguoidungState {
  nguoidungs: Nguoidung[];
  error: string | null;
}

const initialState: NguoidungState = {
  nguoidungs: [],
  error: null,
};

export const nguoidungReducer = createReducer(
  initialState,
  on(loadNguoidungsSuccess, (state, { nguoidungs }) => ({
    ...state,
    nguoidungs,
    error: null,
  })),
  on(loadNguoidungsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(createNguoidungSuccess, (state, { nguoidung }) => ({
    ...state,
    nguoidungs: [...state.nguoidungs, nguoidung],
    error: null,
  })),
  on(createNguoidungFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(deleteNguoidungSuccess, (state, { id }) => ({
    ...state,
    nguoidungs: state.nguoidungs.filter((user) => user.id !== id),
    error: null,
  })),
  on(deleteNguoidungFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(updateNguoidungSuccess, (state, { nguoidung }) => ({
    ...state,
    nguoidungs: state.nguoidungs.map((user) =>
      user.id === nguoidung.id ? nguoidung : user
    ),
    error: null,
  })),
  on(updateNguoidungFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(searchNguoidungsSuccess, (state, { nguoidungs }) => ({
    ...state,
    nguoidungs,
    error: null,
  })),
  on(searchNguoidungsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
