import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Employee} from 'src/app/shared/interfaces/interfaces';
import { Store } from '@ngrx/store';
import {
  selectEmployeeId,
  selectEmployeeToken,
} from '../selectors/auth.selectors';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private sharedApi: SharedApiService,
    private store: Store
  ) {}

  private defaultUser: Employee = {
    address: {
      addressLine1: '',
      addressLine2: '',
      place: '',
      pincode: 0,
    },
    _id: '',
    empId: '',
    name: '',
    branch: '',
    email: '',
    phone: '',
    role: '',
    casualLeaveBalance:0,
    sickLeaveBalance:0,
    designation: '',
    isRemoved: false,
    isBlocked: false,
    leave: [],
    target: [],
    attendance: [],
    __v: 0,
  };

  _id!: string | null;
  token!: string | null;
  retrieveEmployeeData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.retrieveEmployeeData),
      switchMap(() => {
        this.store.select(selectEmployeeId).subscribe((_id) => {
          this._id = _id;
        });
        this.store.select(selectEmployeeToken).subscribe((token) => {
          this.token = token;
        });

        if (!this._id || !this.token) {
          return of({ type: 'error' });
        }

        return this.sharedApi.getEmployeeData(this._id).pipe(
          map((response) =>
            UserActions.storeEmployeeData({
              employeeData: response.employeeData || this.defaultUser,
            })
          ),
          catchError(() => of({ type: 'error' }))
        );
      })
    )
  );
}
