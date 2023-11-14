import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as EmployeesDataActions from '../actions/employeesData.actions';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { EmployeesData } from 'src/app/shared/interfaces/interfaces';

@Injectable()
export class EmployeesDataEffects {
  constructor(
    private actions$: Actions,
    private sharedApi: SharedApiService,
  ) {}

  private defaultEmployeesData: EmployeesData = {
    employeesData: [],
    status: '',
    message: '',
  };

  retrieveEmployeesData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesDataActions.retrieveEmployeesData),
      switchMap(() => {
        return this.sharedApi.getEmployeesData().pipe(
          tap((response) => {
            // console.log('API Response:', response);
          }),
          map((response) =>
            EmployeesDataActions.storeEmployeesData({
              employeesData: response.employeesData || this.defaultEmployeesData,
            })
          ),
          catchError(() => of({ type: 'error' }))
        );
      })
    )
  );
}
