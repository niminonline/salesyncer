import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as LeadsDataActions from '../actions/leadsData.actions';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { LeadsData } from 'src/app/shared/interfaces/interfaces';

@Injectable()
export class LeadsDataEffects {
  constructor(
    private actions$: Actions,
    private sharedApi: SharedApiService,
  ) {}

  private defaultLeadsData: LeadsData = {
    leadsData: [],
    status: '',
    message: '',
  };

  retrieveLeadSourceData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeadsDataActions.retrieveLeadsData),
      switchMap(() => {
        return this.sharedApi.getLeads().pipe(
          tap((response) => {
            // console.log('API Response:', response);
          }),
          map((response) =>
            LeadsDataActions.storeLeadsData({
              leadsData: response.leadsData || this.defaultLeadsData,
            })
          ),
          catchError(() => of({ type: 'error' }))
        );
      })
    )
  );
}
