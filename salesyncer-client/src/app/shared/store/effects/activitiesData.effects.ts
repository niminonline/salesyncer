import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ActivitiesDataActions from '../actions/activitiesData.actions';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { ActivitiesData } from 'src/app/shared/interfaces/interfaces';

@Injectable()
export class ActivitiesDataEffects {
  constructor(
    private actions$: Actions,
    private sharedApi: SharedApiService,
  ) {}

  private defaultActivitiesData: ActivitiesData = {
    activitiesData: [],
    status: '',
    message: '',
  };

  retrieveActivitiesData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivitiesDataActions.retrieveActivitiesData),
      switchMap(() => {
        return this.sharedApi.getActivities().pipe(
          tap((response) => {
          }),
          map((response) =>
            ActivitiesDataActions.storeActivitiesData({
              activitiesData: response.activitiesData || this.defaultActivitiesData,
            })
          ),
          catchError(() => of({ type: 'error' }))
        );
      })
    )
  );
}
