import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as LeadSourceDataActions from '../actions/leadSourceData.actions';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { LeadSourceData } from 'src/app/shared/interfaces/interfaces';

@Injectable()
export class LeadSourceDataEffects {
  constructor(
    private actions$: Actions,
    private sharedApi: SharedApiService,
  ) {}

  private defaultLeadSourceData: LeadSourceData = {
    leadSourceData: [],
    status: '',
    message: '',
  };

  retrieveleadSourceData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeadSourceDataActions.retrieveLeadSourceData),
      switchMap(() => {
        return this.sharedApi.getLeadSource().pipe(
          tap((response) => {
            // console.log('API Response:', response);
          }),
          map((response) =>
            LeadSourceDataActions.storeLeadSourceData({
              leadSourceData: response.leadSourceData || this.defaultLeadSourceData,
            })
          ),
          catchError(() => of({ type: 'error' }))
        );
      })
    )
  );
}
