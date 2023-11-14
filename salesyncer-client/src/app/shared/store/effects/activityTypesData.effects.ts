import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ActivityTypesDataActions from '../actions/activityTypesData.actions';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { ActivityTypesData } from 'src/app/shared/interfaces/interfaces';

@Injectable()
export class ActivityTypesDataEffects {
  constructor(
    private actions$: Actions,
    private sharedApi: SharedApiService,
  ) {}

  private defaultActivityTypesData: ActivityTypesData = {
    activityTypesData: [],
    status: '',
    message: '',
  };

  retrieveActivityTypesData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityTypesDataActions.retrieveActivityTypesData),
      switchMap(() => {
        return this.sharedApi.getActivityTypes().pipe(
          tap((response) => {
            // console.log('API Response:', response);
          }),
          map((response) =>
            ActivityTypesDataActions.storeActivityTypesData({
              activityTypesData: response.activityTypesData || this.defaultActivityTypesData,
            })
          ),
          catchError(() => of({ type: 'error' }))
        );
      })
    )
  );
}
