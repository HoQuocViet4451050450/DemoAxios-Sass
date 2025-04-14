// 2. Tạo actions user.actions.ts
import { createAction, props } from '@ngrx/store';
import { Nguoidung } from './nguoidung.model';

// Load người dùng
export const loadNguoidungs = createAction(
  '[Nguoidung] Tải danh sách người dùng'
);
// Load người dùng thành công
export const loadNguoidungsSuccess = createAction(
  '[Nguoidung] Tải danh sách người dùng thành công',
  props<{ nguoidungs: Nguoidung[] }>()
);
// Load người dùng thất bại
export const loadNguoidungsFailure = createAction(
  '[Nguoidung] Tải danh sách người dùng thất bại',
  props<{ error: string }>()
);

// Tạo người dùng
export const createNguoidung = createAction(
  '[Nguoidung] Tạo mới người dùng',
  props<{ nguoidung: Nguoidung }>()
);
// Tạo người dùng thành công
export const createNguoidungSuccess = createAction(
  '[Nguoidung] Tạo mới người dùng thành công',
  props<{ nguoidung: Nguoidung }>()
);
// Tạo người dùng thất bại
export const createNguoidungFailure = createAction(
  '[Nguoidung] Tạo mới người dùng thất bại',
  props<{ error: string }>()
);

// Xóa người dùng
export const deleteNguoidung = createAction(
  '[Nguoidung] Xóa người dùng',
  props<{ id: number }>()
);
// Xóa người dùng thành công
export const deleteNguoidungSuccess = createAction(
  '[Nguoidung] Xóa người dùng thành công',
  props<{ id: number }>()
);
// Xóa người dùng thất bại
export const deleteNguoidungFailure = createAction(
  '[Nguoidung] Xóa người dùng thất bại',
  props<{ error: string }>()
);

// Cập nhật người dùng
export const updateNguoidung = createAction(
  '[Nguoidung] Cập nhật người dùng',
  props<{ nguoidung: Nguoidung }>()
);
// Cập nhật người dùng thành công
export const updateNguoidungSuccess = createAction(
  '[Nguoidung] Cập nhật người dùng thành công',
  props<{ nguoidung: Nguoidung }>()
);
// Cập nhật người dùng thất bại
export const updateNguoidungFailure = createAction(
  '[Nguoidung] Cập nhật người dùng thất bại',
  props<{ error: string }>()
);

export const searchNguoidungs = createAction(
  '[Nguoidung] Tìm kiếm người dùng',
  props<{ keyword: string }>()
);

export const searchNguoidungsSuccess = createAction(
  '[Nguoidung] Tìm kiếm người dùng thành công',
  props<{ nguoidungs: Nguoidung[] }>()
);

export const searchNguoidungsFailure = createAction(
  '[Nguoidung] Tìm kiếm người dùng thất bại',
  props<{ error: string }>()
);
