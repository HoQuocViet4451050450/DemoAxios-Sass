import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadNguoidungs,
  loadNguoidungsSuccess,
  loadNguoidungsFailure,
  createNguoidung,
  createNguoidungSuccess,
  createNguoidungFailure,
  deleteNguoidung,
  deleteNguoidungSuccess,
  deleteNguoidungFailure,
  updateNguoidung,
  updateNguoidungSuccess,
  updateNguoidungFailure,
  searchNguoidungs,
  searchNguoidungsFailure,
  searchNguoidungsSuccess,
} from './nguoidung.actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import axios from 'axios';
import { Nguoidung } from './nguoidung.model';
import { URLS } from '../api-url';
@Injectable()
export class NguoidungEffects {
  constructor(private actions$: Actions) {}

  // Load danh sách người dùng
  loadNguoidungs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNguoidungs),
      switchMap(() =>
        from(axios.get<Nguoidung[]>(URLS.NGUOIDUNG.GET_ALL)).pipe(
          map((response) =>
            loadNguoidungsSuccess({ nguoidungs: response.data })
          ),
          catchError((error) =>
            of(loadNguoidungsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Thêm người dùng => Load lại danh sách
  createNguoidung$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNguoidung),
      switchMap(({ nguoidung }) =>
        from(axios.post<{ id: number }>(URLS.NGUOIDUNG.CREATE, nguoidung)).pipe(
          mergeMap((response) => [
            createNguoidungSuccess({
              nguoidung: { ...nguoidung, id: response.data.id },
            }),
          ]),
          catchError((error) =>
            of(createNguoidungFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Xóa người dùng => Load lại danh sách
  deleteNguoidung$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteNguoidung),
      switchMap(({ id }) =>
        from(axios.delete(URLS.NGUOIDUNG.DELETE(id))).pipe(
          mergeMap(() => [deleteNguoidungSuccess({ id })]),
          catchError((error) =>
            of(deleteNguoidungFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Cập nhật người dùng => Load lại danh sách
  updateNguoidung$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateNguoidung),
      switchMap(({ nguoidung }) =>
        from(axios.put(URLS.NGUOIDUNG.UPDATE(nguoidung.id), nguoidung)).pipe(
          mergeMap(() => [updateNguoidungSuccess({ nguoidung })]),
          catchError((error) =>
            of(updateNguoidungFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Tìm kiếm người dùng
  searchNguoidungs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchNguoidungs),
      switchMap(({ keyword }) =>
        from(axios.get<Nguoidung[]>(URLS.NGUOIDUNG.SEARCH(keyword))).pipe(
          map((response) =>
            searchNguoidungsSuccess({ nguoidungs: response.data })
          ),
          catchError((error) =>
            of(searchNguoidungsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
