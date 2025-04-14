// 2. Tạo actions user.actions.ts
import { createAction, props } from '@ngrx/store';
import { Bangluong } from './salary.model';

// Load bảng lương
export const loadBangluongs = createAction(
  '[Bangluong] Tải danh sách bảng lương'
);
// Load bảng lương thành công
export const loadBangluongsSuccess = createAction(
  '[Bangluong] Tải danh sách bảng lương thành công',
  props<{ bangluongs: Bangluong[] }>()
);
// Load bảng lương thất bại
export const loadBangluongsFailure = createAction(
  '[Bangluong] Tải danh sách bảng lương thất bại',
  props<{ error: string }>()
);

// Tạo bảng lương
export const createBangluong = createAction(
  '[Bangluong] Tạo mới bảng lương',
  props<{ bangluong: Bangluong }>()
);
// Tạo người bảng lương thành công
export const createBangluongSuccess = createAction(
  '[Bangluong] Tạo mới bảng lương thành công',
  props<{ bangluong: Bangluong }>()
);
// Tạo bảng lương thất bại
export const createBangluongFailure = createAction(
  '[Bangluong] Tạo mới bảng lương thất bại',
  props<{ error: string }>()
);

// Xóa bảng lương
export const deleteBangluong = createAction(
  '[Bangluong] Xóa bảng lương',
  props<{ id: number }>()
);
// Xóa bảng lương thành công
export const deleteBangluongSuccess = createAction(
  '[Bangluong] Xóa bảng lương thành công',
  props<{ id: number }>()
);
// Xóa bảng lương thất bại
export const deleteBangluongFailure = createAction(
  '[Bangluong] Xóa bảng lương thất bại',
  props<{ error: string }>()
);

// Cập nhật bảng lương
export const updateBangluong = createAction(
  '[Bangluong] Cập nhật bảng lương',
  props<{ bangluong: Bangluong }>()
);
// Cập nhật bảng lương thành công
export const updateBangluongSuccess = createAction(
  '[Bangluong] Cập nhật bảng lương thành công',
  props<{ bangluong: Bangluong }>()
);
// Cập nhật bảng lương thất bại
export const updateBangluongFailure = createAction(
  '[Bangluong] Cập nhật bảng lương thất bại',
  props<{ error: string }>()
);

export const searchBangluongs = createAction(
  '[Bangluong] Tìm kiếm bảng lương',
  props<{ keyword: string }>()
);

export const searchBangluongsSuccess = createAction(
  '[Bangluong] Tìm kiếm bảng lương thành công',
  props<{ bangluongs: Bangluong[] }>()
);

export const searchBangluongsFailure = createAction(
  '[Bangluong] Tìm kiếm bảng lương thất bại',
  props<{ error: string }>()
);
