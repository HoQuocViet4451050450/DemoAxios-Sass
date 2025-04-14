import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadBangluongs,
  loadBangluongsFailure,
  loadBangluongsSuccess,
  createBangluong,
  createBangluongFailure,
  createBangluongSuccess,
  deleteBangluong,
  deleteBangluongFailure,
  deleteBangluongSuccess,
  updateBangluong,
  updateBangluongFailure,
  updateBangluongSuccess,
  searchBangluongs,
  searchBangluongsFailure,
  searchBangluongsSuccess,
} from './salary.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import axios from 'axios';
import { Bangluong } from './salary.model';
import { URLS } from '../api-url';
@Injectable()
export class BangluongEffects {
  constructor(private actions$: Actions) {}

  loadBangluongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBangluongs),
      switchMap(() =>
        from(axios.get<Bangluong[]>(URLS.BANGLUONG.GET_ALL)).pipe(
          map((response) =>
            loadBangluongsSuccess({ bangluongs: response.data })
          ),
          catchError((error) =>
            of(loadBangluongsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createBangluong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBangluong),
      switchMap(({ bangluong }) =>
        from(axios.post<{ id: number }>(URLS.BANGLUONG.CREATE, bangluong)).pipe(
          map((response) =>
            createBangluongSuccess({
              bangluong: { ...bangluong, id: response.data.id },
            })
          ),
          catchError((error) =>
            of(createBangluongFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteBangluong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBangluong),
      switchMap(({ id }) =>
        from(axios.delete(URLS.BANGLUONG.DELETE(id))).pipe(
          map(() => deleteBangluongSuccess({ id })),
          catchError((error) =>
            of(deleteBangluongFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateBangluong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBangluong),
      switchMap(({ bangluong }) =>
        from(axios.put(URLS.BANGLUONG.UPDATE(bangluong.id), bangluong)).pipe(
          map(() => updateBangluongSuccess({ bangluong })),
          catchError((error) =>
            of(updateBangluongFailure({ error: error.message }))
          )
        )
      )
    )
  );

  searchBangluongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchBangluongs),
      switchMap(({ keyword }) =>
        from(axios.get<Bangluong[]>(URLS.BANGLUONG.SEARCH(keyword))).pipe(
          map((response) =>
            searchBangluongsSuccess({ bangluongs: response.data })
          ),
          catchError((error) =>
            of(searchBangluongsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Lắng nghe action createBangluongSuccess và dispatch lại loadBangluongs
  loadBangluongsAfterCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBangluongSuccess), // Khi create thành công
      switchMap(() => [loadBangluongs()]) // Dispatch lại action loadBangluongs để tải lại bảng lương
    )
  );

  // Lắng nghe action updateBangluongSuccess và dispatch lại loadBangluongs
  loadBangluongsAfterUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBangluongSuccess), // Khi update thành công
      switchMap(() => [loadBangluongs()]) // Dispatch lại action loadBangluongs để tải lại bảng lương
    )
  );

  // Lắng nghe action deleteBangluongSuccess và dispatch lại loadBangluongs
  loadBangluongsAfterDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBangluongSuccess), // Khi delete thành công
      switchMap(() => [loadBangluongs()]) // Dispatch lại action loadBangluongs để tải lại bảng lương
    )
  );
}
