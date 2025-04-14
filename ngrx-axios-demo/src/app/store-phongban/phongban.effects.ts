// PhongbanEffects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadPhongbans,
  loadPhongbansFailure,
  loadPhongbansSuccess,
  createPhongban,
  createPhongbanFailure,
  createPhongbanSuccess,
  deletePhongban,
  deletePhongbanFailure,
  deletePhongbanSuccess,
} from './phongban.action';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import axios from 'axios';
import { Phongban } from './phongban.model';
import { URLS } from '../api-url';

@Injectable()
export class PhongbanEffects {
  constructor(private actions$: Actions) {}

  // Load danh sách phòng ban
  loadPhongbans$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPhongbans),
      switchMap(() =>
        from(axios.get<Phongban[]>(URLS.PHONGBAN.GET_ALL)).pipe(
          map((response) => loadPhongbansSuccess({ phongbans: response.data })),
          catchError((error) =>
            of(loadPhongbansFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Thêm phòng ban => Load lại danh sách
  createPhongban$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPhongban),
      switchMap(({ phongban }) =>
        from(axios.post<{ id: number }>(URLS.PHONGBAN.CREATE, phongban)).pipe(
          mergeMap((response) => [
            createPhongbanSuccess({
              phongban: { ...phongban, id: response.data.id },
            }),
          ]),
          catchError((error) =>
            of(createPhongbanFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Xóa phòng ban => Load lại danh sách
  deletePhongban$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePhongban),
      switchMap(({ id }) =>
        from(axios.delete(URLS.PHONGBAN.DELETE(id))).pipe(
          mergeMap(() => [deletePhongbanSuccess({ id })]),
          catchError((error) =>
            of(deletePhongbanFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
