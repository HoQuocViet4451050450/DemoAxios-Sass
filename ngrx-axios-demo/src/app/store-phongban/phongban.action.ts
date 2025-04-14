import { createAction, props } from '@ngrx/store';
import { Phongban } from './phongban.model';

// 🔹 Load danh sách phòng ban
export const loadPhongbans = createAction('[Phongban] Tải danh sách phòng ban');

export const loadPhongbansSuccess = createAction(
  '[Phongban] Tải danh sách phòng ban thành công',
  props<{ phongbans: Phongban[] }>()
);

export const loadPhongbansFailure = createAction(
  '[Phongban] Tải danh sách phòng ban thất bại',
  props<{ error: string }>()
);

// 🔹 Tạo phòng ban
export const createPhongban = createAction(
  '[Phongban] Tạo mới phòng ban',
  props<{ phongban: Phongban }>()
);

export const createPhongbanSuccess = createAction(
  '[Phongban] Tạo mới phòng ban thành công',
  props<{ phongban: Phongban }>()
);

export const createPhongbanFailure = createAction(
  '[Phongban] Tạo mới phòng ban thất bại',
  props<{ error: string }>()
);

// 🔹 Xóa phòng ban
export const deletePhongban = createAction(
  '[Phongban] Xóa phòng ban',
  props<{ id: number }>()
);

export const deletePhongbanSuccess = createAction(
  '[Phongban] Xóa phòng ban thành công',
  props<{ id: number }>()
);

export const deletePhongbanFailure = createAction(
  '[Phongban] Xóa phòng ban thất bại',
  props<{ error: string }>()
);
