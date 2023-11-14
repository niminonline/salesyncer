import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as SalesDataActions from '../actions/salesData.actions';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { SalesData } from 'src/app/shared/interfaces/interfaces';

@Injectable()
export class SalesDataEffects {
  constructor(
    private actions$: Actions,
    private sharedApi: SharedApiService,
  ) {}

  private defaultSalesData: SalesData = {
    salesData: [],
    status: '',
    message: '',
  };

  retrieveSalesData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SalesDataActions.retrieveSalesData),
      switchMap(() => {
        return this.sharedApi.getSales().pipe(
          tap((response) => {
            // console.log('API Response:', response);
          }),
          map((response) =>
            SalesDataActions.storeSalesData({
              salesData: response.salesData || this.defaultSalesData,
            })
          ),
          catchError(() => of({ type: 'error' }))
        );
      })
    )
  );
}
